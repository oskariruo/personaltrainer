import React, {useEffect, useState} from "react";
import { AgGridReact } from 'ag-grid-react';
import AddCustomer from "./addCustomer";
import AddWorkout from "./addWorkout";
import EditCustomer from "./editCustomer";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-dark.css";

import { CSVLink } from 'react-csv';

import 'bootstrap/dist/css/bootstrap.css';
import Trash from 'react-bootstrap-icons/dist/icons/trash-fill';

function TrainerPage() {
    
    const [customers, setCustomers] = useState([]);

    // fetching Customer data
    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => { setCustomers(data.content)
            })
            .catch(e => console.error(e))
    }
    
    useEffect(() => 
        fetchCustomers(), []);
    
        // deleting Customer
        const deleteCustomer = href => {
            if (window.confirm('Are you sure?')) {
                fetch(href, {
                    method: 'DELETE'
                })
                    .then(response => {
                        if (response.ok) {
                            alert("Workout was deleted successfully!")
                            fetchCustomers();
                        }
                        else { alert('Something went wrong!') }
                    })
                    .catch(e => console.error(e));
            }
        }

        //adding a new Customer
        const addCustomer = customer => {
            console.log(customer.data)
            fetch('https://customerrest.herokuapp.com/api/customers', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(customer)
                })
                .then(response => {
                    if (response.ok) {
                        alert("Customer was added");
                        fetchCustomers();
                    }
                    else
                        alert('Failed to add new customer!')
                
            }).catch((e) => console.log(e));

        }

        //editing a existing Customer
        const editCustomer = (url, updatedCustomer) => {
            fetch(url, {
                method: 'PUT',
                body: JSON.stringify(updatedCustomer),
                headers: { 'Content-type': 'application/json' }
            })
                .then(response => {
                    if (response.ok) {
                        alert("Customer was edited!")
                        fetchCustomers();
                    }
                    else
                        alert('Something went wrong with the editing')
                })
                .catch(e => console.log(e))
        }

        // adding a Workout
        const addWorkout = workout => {
            alert(workout);
            fetch('https://customerrest.herokuapp.com/api/trainings', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(workout)
            })
            .then(res => {
                if (res.ok) {
                    alert("Customer was added");
                    fetchCustomers();
                }
                else
                    alert('Failed to add new customer!')
            })
            .catch((err) => console.log(err));
        }

        const [columns] = useState([
            { field: 'firstname', width: 160, sortable: true, filter: true },
            { field: 'lastname', width: 160, sortable: true, filter: true },
            { field: 'phone', width: 160, sortable: true, filter: true, cellStyle: { fontWeight: '400' } },
            { field: 'email', width: 200, sortable: true, filter: true, cellStyle: { fontWeight: '400' } },
            { field: 'streetaddress', width: 200, sortable: true, filter: true, cellStyle: { fontWeight: '400' } },
            { field: 'postcode', width: 140, sortable: true, filter: true, cellStyle: { fontWeight: '400' } },
            { field: 'city', width: 140, sortable: true, filter: true, cellStyle: { fontWeight: '400' } },
            {   headerName: '',
                    width: 70,
                    field: '',
                cellRendererFramework: params => <button type="button" className="btn btn-danger" onClick={() => deleteCustomer(params.data.links[1].href)} style={{ height: '10', width: '50px', paddingTop: '5px', alignItems: 'right', outline: 'none', marginTop: '10px' }}><Trash/></button>
                },
                {
                    headerName: '',
                    sortable: false,
                    filter: false,
                    width: 90,
                    field: '',
                    cellRendererFramework: params => <EditCustomer editCustomer={editCustomer} row={params}/>
                },
                {
                    headerName: '',
                    sortable: false,
                    filter: false,
                    width: 140,
                    field: '',
                    cellRendererFramework: (params) => (
                        <AddWorkout addWorkout={addWorkout} row={params} />
                    ),
                }
        ])

        return (
            <div >
                <div>
                <CSVLink style={{ marginLeft: '20px', color: "gray", fontSize: '20px', padding: '10px', background: 'white', width: '230px', borderRadius: '5px' }} data={customers} separator=";">Export CSV</CSVLink>

                <div className="ag-theme-dark" style={{ width: '100%', height: 520, fontWeight: '700', lineHeight: '44px', fontSize: '19px', paddingTop: '10px' }}>
                    <AgGridReact
                        rowData={customers}
                        columnDefs={columns}
                        enableRangeSelection={true}
                        defaultColDef={{ resizable: true }}
                        rowHeight={65}
                        pagination={true}
                        paginationPageSize={7}
                    />
                    
                    
                    </div>
                    <AddCustomer addCustomer={addCustomer} />
                </div>
            </div>
        );
    };
    
    export default TrainerPage;
