import React, { Component } from 'react';
import { callApi, getSession } from './api';
import './MenuBar.css';
class MenuBar extends Component {
    constructor(props)
    {
        super();
       this.state={menuitems:[]};
       this.loadMenus=this.loadMenus.bind(this);
    }
    componentDidMount()
    {  
        let  csr = getSession("csrid");
        let data= JSON.stringify({csrid:csr});
        //callApi("POST","http://localhost:8080/menus/getmenusbyrole",data,this.loadMenus);
     callApi("POST","http://localhost:8080/menus/getmenus","",this.loadMenus);
    }
    loadMenus(response)
    {
        let data=JSON.parse(response);
        this.setState({menuitems:data});

    }
    
    render() {
        const {menuitems}=this.state;

        return (
            <div className='menubar'>
                <div className='menuheader'><img src='/menu.png' alt=''/>MENU</div>
                <div className='menulist'>
                    <ul>
                        {menuitems.map((row=>
                        <li onClick={()=>this.props.onMenuClick(row.mid)}><img src={row.icon} alt=''/>{row.menu}</li>

                        ))}
                       
                    </ul>
                    </div>               
            </div>
        );
    }
}

export default MenuBar;