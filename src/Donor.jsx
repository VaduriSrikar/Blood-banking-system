import React, { Component } from 'react';
import './Donor.css';
import { callApi } from './api';

class Donor extends Component {
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
            joblist: []
        };

        this.readDonorResponse = this.readDonorResponse.bind(this);
        this.updateDonorresponse = this.updateDonorresponse.bind(this);
        this.saveDonorResponse = this.saveDonorResponse.bind(this);
    }

    componentDidMount() {
        callApi("GET", "http://localhost:8080/donors/readdonor", "", this.readDonorResponse);
    }

    readDonorResponse(response) {
        if (response.includes("401::")) {
            alert(response.split("::")[1]);
            return;
        }
        let data = JSON.parse(response);
        this.setState({ joblist: data });
    }

    loadInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    saveDonorDetails = () => {
        let name = document.getElementById("T1");
        let organisation = document.getElementById("T2");
        let loc = document.getElementById("T3");
        let bloodgroup = document.getElementById("T4");
        let rhfactor = document.getElementById("T5");
        let medicalhistory = document.getElementById("T6");

        // Reset borders
        [name, organisation, loc, bloodgroup, rhfactor, medicalhistory].forEach(input => input.style.border = "");

        // Validate fields
        if (name.value === "") { name.style.border = "1px solid red"; name.focus(); return; }
        if (organisation.value === "") { organisation.style.border = "1px solid red"; organisation.focus(); return; }
        if (loc.value === "") { loc.style.border = "1px solid red"; loc.focus(); return; }
        if (bloodgroup.value === "") { bloodgroup.style.border = "1px solid red"; bloodgroup.focus(); return; }
        if (rhfactor.value === "") { rhfactor.style.border = "1px solid red"; rhfactor.focus(); return; }
        if (medicalhistory.value === "") { medicalhistory.style.border = "1px solid red"; medicalhistory.focus(); return; }

        const data = JSON.stringify(this.state);

        if (this.state.id === "") {
            callApi("POST", "http://localhost:8080/donors/insert", data, this.saveDonorResponse);
        } else {
            callApi("PUT", "http://localhost:8080/donors/update", data, this.saveDonorResponse);
        }
    }

    saveDonorResponse(response) {
        let data = response.split("::");
        alert(data[1]);
        this.setState({
            id: '',
            name: '',
            organisation: '',
            location: '',
            bloodgroup: '',
            rhfactor: '',
            medicalhistory: ''
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
        callApi("GET", "http://localhost:8080/donors/getdonor/" + id, "", this.updateDonorresponse);
    }

    updateDonorresponse(response) {
        if (response.includes("401::")) {
            alert(response.split("::")[1]);
            return;
        }
        let data = JSON.parse(response);
        this.setState({
            id: data.id,
            name: data.name,
            organisation: data.organisation,
            location: data.location,
            bloodgroup: data.bloodgroup,
            rhfactor: data.rhfactor,
            medicalhistory: data.medicalhistory
        });
        this.showPopUp();
    }

    deleteDonor(id) {
        let resp = window.confirm("Are you sure that you want to delete?");
        if (!resp) return;
        callApi("DELETE", "http://localhost:8080/donors/delete/" + id, "", this.saveDonorResponse);
    }

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
                            <label>Donor name*</label>
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
                    <label>All Donors</label>
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
                        </div>
                    ))}
                </div>

                <div className='footer'>
                    <button onClick={() => this.showPopUp()}>Add Donor</button>
                </div>
            </div>
        );
    }
}

export default Donor;
