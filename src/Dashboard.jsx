import React, { Component } from 'react';
import './DashBoard.css';
import { callApi, getSession, setSession } from './api';
import MenuBar from './MenuBar';
import Donor from './Donor';
import Inventory from './Inventory';
import Requests from './Requests';

class Dashboard extends Component {
    constructor(props)
    {
        super(props);
        this.state={fullname:'',activeComponents:''};
        this.fullnameResponse=this.fullnameResponse.bind(this);
        this.loadComponents=this.loadComponents.bind(this);
    }
    componentDidMount()
    {
        let crs=getSession("csrid");
        if(crs==="")
        {
            this.logout();
        }
        
        let data=JSON.stringify({csrid:crs});
        callApi("POST","http://localhost:8080/users/getfullname",data,this.fullnameResponse);
    }
    fullnameResponse(response)
    {
        this.setState({fullname:response});
    }
    logout()
    {
        setSession("csrid","",-1);
        window.location.replace("/");
    }
    loadComponents(mid)
    {
          let components={
            "1":<Donor/>,
            "2":<Inventory/>,
            "3":<Requests/>
          }
          this.setState({activeComponents:components[mid]});

    }


    render() {
        const {fullname,activeComponents}=this.state;
        return (
            <div className='dashboard'>
                <div className='header'>
                    <img className='logo' src='./logo.jpg' alt='' />
                    <div className='logoText'>Blood Banking Sytem</div>
                    <img className='logout' onClick={()=>this.logout()}src='./logout.png' alt='' />
                    <label>{fullname}</label>
                </div>
                <div className='menu'>
                    <MenuBar onMenuClick={this.loadComponents}/>
                </div>
                <div className='outlet'>{activeComponents}</div>                
            </div>
        );
    }
}

export default Dashboard;
