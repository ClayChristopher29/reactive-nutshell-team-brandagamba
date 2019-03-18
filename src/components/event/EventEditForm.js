import React, { Component } from "react";
import "./event.css"
import EventManager from '../../modules/EventManager'


export default class EventForm extends Component {
  // Set initial state
  state = {
    name: "",
    date: "",
    location: "",
    // userId:""
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  updateEvent = evt => {
    evt.preventDefault();
      const event = {
        name: this.state.name,
        date: this.state.date,
        location: this.state.location,
        // userId is currently set for test purposes
        userId: 1
      };

      // Create the event and redirect user to event list
      this.props
        .addEvent(event)
        this.props.history.push("/events")
  };
  componentDidMount() {
    EventManager.getSingleEvent(this.props.match.params.eventId)
    .then(event => {
      this.setState({
        name: event.name,
        date: event.date,
        location: event.location,
      });
    });
  }



    render() {
        return(
            <form>
    <div className="form-group">
    <label htmlFor="formEventInput">Event Name</label>
    <input type="text" className="form-control" id="name" value={this.state.name} onChange={this.handleFieldChange} />
    </div>
    <div className="form-group">
    <label htmlFor="formEventInput">Event Date</label>
    <input type="date" className="form-control" id="date" value={this.state.date} onChange={this.handleFieldChange} />
    </div>
    <div className="form-group">
    <label htmlFor="formEventInput">Event Location</label>
    <input type="text" className="form-control" id="location" value={this.state.location} onChange={this.handleFieldChange}/>
    </div>
    <button type="button" className="btn btn-success"
    onClick={this.updateEvent}>Submit</button>
    </form>
        )
    }
}