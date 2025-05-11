    import React, { Component } from 'react';
    import './Inventory.css';
    import { callApi } from './api';

    class Inventory extends Component {
        constructor() {
            super();
            this.state = {
                inventory: []
            };
        }

        componentDidMount() {
            callApi("GET", "http://localhost:8080/donors/inventory", "", this.loadInventory);
        }

        loadInventory = (response) => {
            if (response.includes("401::")) {
                alert(response.split("::")[1]);
                return;
            }
            const data = JSON.parse(response);
            const inventoryArray = Object.entries(data).map(([key, value]) => {
                const [bloodgroup, rhfactor] = key.length > 1
                    ? [key.slice(0, -1), key.slice(-1)]
                    : [key, ""];
                return { bloodgroup, rhfactor, count: value };
            });
            this.setState({ inventory: inventoryArray });
        }

        render() {
            return (
                <div className="inventory-container">
                    <h2>Blood Inventory</h2>
                    <table className="inventory-table">
                        <thead>
                            <tr>
                                <th>Blood Group</th>
                                <th>Rh Factor</th>
                                <th>Units Available</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.inventory.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.bloodgroup}</td>
                                    <td>{item.rhfactor}</td>
                                    <td>{item.count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }
    }

    export default Inventory;
