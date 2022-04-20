import React, {useEffect, useState} from "react";
import { AgGridReact } from 'ag-grid-react';

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-dark.css";

import 'bootstrap/dist/css/bootstrap.css';
import Trash from 'react-bootstrap-icons/dist/icons/trash';

function TrainerPage() {
    
    const [customers, setCustomers] = useState([]);

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => { setCustomers(data.content)
            })
            .catch(e => console.error(e))
    }
    
    React.useEffect(() => 
        fetchCustomers(), []);

        const deleteCustomer = id => {
            console.log(id)
            if (window.confirm('Are you sure?')) {
                fetch('https://customerrest.herokuapp.com/api/customers/' + id, {
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
                cellRendererFramework: params => <button type="button" className="btn btn-danger" onClick={() => deleteCustomer(params.data.id)}><Trash/></button>
                }
        ])

        return (
            <div >
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
            </div>
        );
    };
    
    export default TrainerPage;
