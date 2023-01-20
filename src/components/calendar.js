import React, { useState, useEffect, cloneElement, Children } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

function WorkoutCalendar() {

  const [trainings, setWorkouts] = useState([]);
  const localizer = momentLocalizer(moment);

  useEffect(() => fetchWorkouts(), []);

  const fetchWorkouts = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then(response => response.json())
      .then(responseData => setWorkouts(responseData))
      .catch(error => console.error(error));
  };

  const ColoredDateCellWrapper = ({ children }) =>
    cloneElement(Children.only(children), {
      style: {
        backgroundColor: 'lightblue',
      }
    })

  const events = trainings.map(event => ({
    startDate: moment(event.date).toDate(),
    endDate: moment(event.date)
      .add(event.duration, "minutes")
      .toDate(),
    title:
      event.customer.firstname +
      " " +
      event.customer.lastname +
      ": " +
      event.activity
  }));

  return (
    <div style={{backgroundColor:"white", paddingTop: 60, height: '100%', width: '90%', margin: 'auto' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="startDate"
        endAccessor="endDate"
        showMultiDayTimes
        components={{
          timeSlotWrapper: ColoredDateCellWrapper,
        }}
        style={{ margin: 20, height: "70vh" }}

      />
    </div>
  );
}

export default WorkoutCalendar;