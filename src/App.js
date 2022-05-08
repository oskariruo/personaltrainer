import './App.css';
import React from 'react';

import {Nav, Navbar} from 'react-bootstrap';
import Containter from 'react-bootstrap/Container';

import {BrowserRouter, Routes, Link, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import CustomerPage from './components/customerpage';
import TrainerPage from './components/trainerpage';
import WorkoutCalendar from './components/calendar';
import Statistics from './components/statistics';

import Pulse from 'react-bootstrap-icons/dist/icons/heart-pulse';
import People from 'react-bootstrap-icons/dist/icons/people';
import Calendar from 'react-bootstrap-icons/dist/icons/calendar';
import Watch from 'react-bootstrap-icons/dist/icons/stopwatch';

//main app
function App() {

    return (
        <div style={{backgroundColor: '#302e2e'}}>
		    <BrowserRouter>
                <div>
                    <Navbar bg="transparent">
                        <Containter className="menu-style" style={{ marginleft: '35px' }}>
                          <Nav.Link style={{color: '#CCCCCC',...{fontSize:'25px'}}} as={Link} to={'/'}> Workouts <Pulse />
                          </Nav.Link>
                          <Nav.Link style={{color: '#CCCCCC',...{fontSize:'25px'}}} as={Link} to={'/trainerpage'}> Customers <People />
                          </Nav.Link>
                          <Nav.Link style={{color: '#CCCCCC',...{fontSize:'25px'}}} as={Link} to={'/calendar'}> Calendar <Calendar/>
                          </Nav.Link>
                          <Nav.Link style={{color: '#CCCCCC',...{fontSize:'25px'}}} as={Link} to={'/statistics'}> Statistics <Watch/>
                          </Nav.Link>
                        </Containter>
                    </Navbar>
                </div>

                <div>

                    <Routes>
                        <Route path="/" element={<CustomerPage />}/>
                        <Route path="/trainerpage" element={<TrainerPage />}/>
                        <Route path="/calendar" element={<WorkoutCalendar />}></Route>
                        <Route path="/statistics" element={<Statistics />}></Route>
                        <Route render={() => <h1>Page not found</h1>} />
                    </Routes>
                </div>
            </BrowserRouter>
	    </div>
    );
}

export default App;