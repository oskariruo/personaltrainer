import React, {useState, useEffect} from 'react'
import {BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid} from 'recharts';

function Statistics() {
    const [trainings, setWorkouts] = useState([])   


useEffect(() => 
    fetchWorkouts(), []);
//fetching workouts
const fetchWorkouts = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => {setWorkouts(data)
        })
        .catch(e => console.error(e))
}

return (
    <div>
        <BarChart width={800} height={400} data={trainings}>
        <XAxis dataKey="activity" stroke="#8884d8" />
        <YAxis />
        <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#333', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
        <Tooltip wrapperStyle={{ width: 120, backgroundColor: '#333' }} />
        <Bar dataKey="duration" fill="#8884d8" barSize={30} />
        </BarChart>
    </div>
)
}

export default Statistics;
