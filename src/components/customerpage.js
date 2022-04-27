import React, {useEffect, useState} from "react";
import {AgGridReact} from 'ag-grid-react';

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-dark.css";

import 'bootstrap/dist/css/bootstrap.css';
import Trash from 'react-bootstrap-icons/dist/icons/trash';

import dayjs from 'dayjs';

function CustomerPage() {

    const [workouts, setWorkouts] = useState([]);

    
    const fetchWorkouts = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => { setWorkouts(data)
            })
            .catch(e => console.error(e))
    }
    
    React.useEffect(() => 
        fetchWorkouts(), []);

    const deleteWorkout = id => {
        if (window.confirm('Are you sure?')) {
            fetch('https://customerrest.herokuapp.com/api/trainings/' + id, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        alert("Workout was deleted successfully!")
                        fetchWorkouts();
                    }
                    else { alert('Something went wrong!') }
                })
                .catch(e => console.error(e));
        }
    }

            const [columns] = useState([
                {    headerName: "Date", field: 'date', sortable: true, filter: true, floatingFilter: true, maxWidth: 180,
                    cellStyle: { fontWeight: '400' },
                    valueFormatter: (params) => dayjs(params.value).format('H:mm, DD MMM')
                },
                {   headerName: "Activity", field: 'activity', filter: true, sortable: true, floatingFilter: true, maxWidth: 180,
                    cellStyle: { fontWeight: '600', fontSize: '18px' }
                },
                {   headerName: "Duration (Min)", field: 'duration', filter: true, sortable: true, floatingFilter: true, maxWidth: 100,
                    cellStyle: { fontWeight: '400', fontSize: '18px' }
                },
                {   headerName: "First Name", field: 'customer.firstname', filter: true, sortable: true, floatingFilter: true, maxWidth: 110,
                    cellStyle: { textAlign: 'left', fontWeight: '400', fontSize: '18px' }
                },
                {   headerName: "Last Name", field: 'customer.lastname', filter: true, sortable: true, floatingFilter: true, maxWidth: 140,
                    cellStyle: { textAlign: 'left', fontWeight: '400', fontSize: '18px' }
                },
                {   headerName: "City", field: 'customer.city', sortable: true, filter: true, floatingFilter: true, maxWidth: 120,
                    cellStyle: { textAlign: 'left', fontWeight: '400', fontSize: '18px' }
                },
                {   headerName: "Phone", field: "customer.phone", sortable: true, filter: true, floatingFilter: true, maxWidth: 150,
                    cellStyle: { textAlign: 'left', fontWeight: '400', fontSize: '18px' }
                },
                {   headerName: "Email", field: 'customer.email', sortable: true, filter: true, floatingFilter: true, maxWidth: 180,
                    cellStyle: { textAlign: 'left', fontWeight: '400', fontSize: '18px' }
                },
                {   headerName: '',
                    width: 70,
                    field: '',
                cellRendererFramework: (params) => <button type="button" className="btn btn-danger" onClick={() => deleteWorkout(params.data.id)}><Trash/></button>
                }     
            ]);
        
            return (
                <div >
                    <div className="ag-theme-dark" style={{ width: "100%", height: 520, fontWeight: '700', fontSize: '19px', marginTop: '50px' }}>
                        <AgGridReact
                            rowData={workouts}
                            columnDefs={columns}
                            enableRangeSelection={true}
                            defaultColDef={{ resizable: true }}
                            rowHeight={60}
                            pagination={true}
                            paginationPageSize={7}
                        />
                    </div>
                </div>
            )
        }
        
        export default CustomerPage;
