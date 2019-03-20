import React, { Component } from "react";
import "./event.css"
import Moment from 'react-moment';




export default class EventForm extends Component {
  // Set initial state
  state = {
    name: "",
    date: "",
    location: "",
    userId:parseInt(sessionStorage.getItem("activeUser"))
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  constructNewEvent = evt => {
    evt.preventDefault();
      const event = {
        name: this.state.name,
        date: this.state.date,
        location: this.state.location,
        // userId is currently set for test purposes
        userId: this.state.userId
      };

      // Create the event and redirect user to event list
      this.props
        .addEvent(event)
        this.props.history.push("/events")
  };


    render() {

        return(
            <form>
    <div className="form-group">
    <label htmlFor="formEventInput">Event Name</label>
    <input type="text" className="form-control" id="name" placeholder="Name..." onChange={this.handleFieldChange} />
    </div>
    <div className="form-group">
    <label htmlFor="formEventInput">Event Date</label>
    <input type="date" className="form-control" id="date" placeholder="Date..." onChange={this.handleFieldChange} />
    </div>
    <div className="form-group">
    <label htmlFor="formEventInput">Event Location</label>
    <input type="text" className="form-control" id="location" placeholder="Location..." onChange={this.handleFieldChange}/>
    </div>
    <button type="button" className="btn btn-success"
    onClick={this.constructNewEvent}>Submit</button>
    </form>
        )
    }
}