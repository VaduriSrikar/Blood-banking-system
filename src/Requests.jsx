import React, { Component } from 'react';
import './Requests.css';
import { callApi } from './api';

class Requests extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            name: '',
            organisation: '',
            location: '',
            bloodgroup: '',
            rhfactor: '',
            medicalhistory: '',
            status: 'pending',
            joblist: [],
            inventory: []
        };

        this.readrequestResponse = this.readrequestResponse.bind(this);
        this.updaterequestresponse = this.updaterequestresponse.bind(this);
        this.saverequestResponse = this.saverequestResponse.bind(this);
    }

   componentDidMount() {
    // First call the accept logic in backend
    callApi("PUT", "http://localhost:8080/requests/accept", "", () => {
        callApi("GET", "http://localhost:8080/donors/inventory", "", (invResponse) => {
            if (invResponse.includes("401::")) {
                alert(invResponse.split("::")[1]);
                return;
            }
            const inventoryData = JSON.parse(invResponse);
            this.setState({ inventory: inventoryData }, () => {
                callApi("GET", "http://localhost:8080/requests/readrequest", "", this.readrequestResponse);
            });
        });
    });
}


    readrequestResponse(response) {
        if (response.includes("401::")) {
            alert(response.split("::")[1]);
            return;
        }
        let data = JSON.parse(response);
        const updatedRequests = data.map(req => {
            const key = req.bloodgroup + req.rhfactor;
            const available = this.state.inventory[key] || 0;
            return {
                ...req,
                status: available >= 1 ? 'accepted' : 'pending'
            };
        });

        // Optionally update server for accepted status
        updatedRequests.forEach(req => {
            if (req.status === "accepted" && req.status !== this.state.status) {
                callApi("PUT", "http://localhost:8080/requests/update", JSON.stringify(req), () => {});
            }
        });

        this.setState({ joblist: updatedRequests });
    }

    loadInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    saveDonorDetails = () => {
        const fields = ["T1", "T2", "T3", "T4", "T5", "T6"];
        const inputs = fields.map(id => document.getElementById(id));
        inputs.forEach(input => input.style.border = "");

        for (let input of inputs) {
            if (input.value === "") {
                input.style.border = "1px solid red";
                input.focus();
                return;
            }
        }

        const key = this.state.bloodgroup + this.state.rhfactor;
        const available = this.state.inventory[key] || 0;
        const status = available >= 1 ? "accepted" : "pending";

        const data = JSON.stringify({ ...this.state, status });

        if (this.state.id === "") {
            callApi("POST", "http://localhost:8080/requests/insert", data, this.saverequestResponse);
        } else {
            callApi("PUT", "http://localhost:8080/requests/update", data, this.saverequestResponse);
        }
    }

    saverequestResponse(response) {
        let data = response.split("::");
        alert(data[1]);
        this.setState({
            id: '',
            name: '',
            organisation: '',
            location: '',
            bloodgroup: '',
            rhfactor: '',
            medicalhistory: '',
            status: ''
        });
        this.closePopup();
        this.componentDidMount();
    }

    showPopUp() {
        document.getElementById("jppopup").style.display = "block";
    }

    closePopup() {
        document.getElementById("jppopup").style.display = "none";
    }

    updateDonor(id) {
        callApi("GET", "http://localhost:8080/requests/getrequest/" + id, "", this.updaterequestresponse);
    }

    updaterequestresponse(response) {
        if (response.includes("401::")) {
            alert(response.split("::")[1]);
            return;
        }
        let data = JSON.parse(response);
        this.setState({ ...data });
        this.showPopUp();
    }

    deleteDonor(id) {
        let resp = window.confirm("Are you sure that you want to delete?");
        if (!resp) return;
        callApi("DELETE", "http://localhost:8080/donors/delete/" + id, "", this.saverequestResponse);
    }
    acceptRequest = (data) => {
    const { id, bloodgroup, rhfactor } = data;
    callApi("PUT", `http://localhost:8080/requests/accept/${id}`, "", (response) => {
        if (response.includes("401::")) {
            alert(response.split("::")[1]);
            return;
        }
        alert("Request accepted and inventory updated!");
        this.componentDidMount(); // reload data
    });
};


    render() {
        const { id, name, organisation, location, bloodgroup, rhfactor, medicalhistory, joblist } = this.state;

        return (
            <div className='JPContainer'>
                <div id='jppopup' className='popup'>
                    <div className='popupwindow'>
                        <div className='popupheader'>
                            <label>{id ? "Update Donor" : "New Donor"}</label>
                            <span onClick={() => this.closePopup()}>&times;</span>
                        </div>
                        <div className='popupcontent'>
                            <label>Requester name*</label>
                            <input type='text' id="T1" name='name' value={name} onChange={this.loadInputChange} />
                            <label>Organisation Name*</label>
                            <input type='text' id="T2" name='organisation' value={organisation} onChange={this.loadInputChange} />
                            <label>Location*</label>
                            <input type='text' id="T3" name='location' value={location} onChange={this.loadInputChange} />
                            <label>Blood Group*</label>
                            <select id='T4' name='bloodgroup' value={bloodgroup} onChange={this.loadInputChange}>
                                <option value="">Select</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="AB">AB</option>
                                <option value="O">O</option>
                            </select>
                            <label>RH Factor*</label>
                            <input type='text' id="T5" name='rhfactor' value={rhfactor} onChange={this.loadInputChange} />
                            <label>Medical History*</label>
                            <textarea id='T6' rows="5" name='medicalhistory' value={medicalhistory} onChange={this.loadInputChange}></textarea>
                            <button onClick={this.saveDonorDetails}>Save</button>
                        </div>
                        <div className='popupfooter'></div>
                    </div>
                </div>

                <div className='header'>
                    <label>All Requests</label>
                </div>

                <div className='content'>
                    {joblist.map((data) => (
                        <div key={data.id} className='result'>
                            <div className='div1'>
                                <label>{data.name}</label>
                                <label id='bg'>{data.bloodgroup}</label>
                                <span>{data.rhfactor}</span>
                                <img src="/edit.png" alt="Edit" onClick={() => this.updateDonor(data.id)} />
                                <img src="/delete.png" alt="Delete" onClick={() => this.deleteDonor(data.id)} />
                            </div>
                            <div className='div2'>
                                <label>{data.organisation}</label>
                                <label>{data.location}</label>
                            </div>
                            <div className='div3'>
                                <label>{data.medicalhistory}</label>
                            </div>
                            <div className='div4'>
                                <strong>Status: </strong><span>{data.status}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='footer'>
                    <button onClick={() => this.showPopUp()}>Add Request</button>
                </div>
            </div>
        );
    }
}

export default Requests;
