import React, { Component } from "react";
import "./event.css"
import Moment from 'react-moment';


export default class EventList extends Component {


//   this.state.data.sort((a, b) => a.item.timeM > b.item.timeM).map(
//     (item, i) => <div key={i}> {item.matchID} {item.timeM} {item.description}</div>
// )
  state = {
    search: ""
  };
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };



    render() {
      let filteredEvents = this.props.events.filter((event) =>{
      return event.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 || event.date.indexOf(this.state.search) !== -1 })
        return(
          <React.Fragment>
            <h1>Events</h1>
            <input type="text"
             placeholder="Search"
             className="search"
             value={this.state.search}
             id="search"
              onChange={this.handleFieldChange}
            />
            <button type="button" className="btn btn-secondary" onClick={() => {
                                this.props.history.push("/events/new")}}>Add Event</button>
               <section className="firstClass">
            {filteredEvents.sort((a, b) => a.date > b.date ? 1 : -1).map(event=>
                <div className="carddb" key={event.id}>
                <div className="card-body">
                  <p className="card-title">{event.name}</p>
                  <p className="card-subtitle mb-2 text-muted"><Moment format="MM/DD/YYYY">
               {event.date}
           </Moment></p>
                  <p className="card-text">{event.location}</p>
                  <button  className="card-link btn btn-primary"
                   onClick={() => {
                    this.props.history.push(`/events/${event.id}/edit`);
                  }}>Edit Event</button>
                  <button  className="card-link btn btn-danger"
                  onClick={() => this.props.deleteEvent(event.id)} >Delete Event</button>
                </div>
              </div>
                )}


                </section>
            </React.Fragment>

        )
    }
}