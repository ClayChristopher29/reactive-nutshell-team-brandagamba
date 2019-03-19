import React, { Component } from "react";
import "./event.css"


export default class EventList extends Component {





    render() {
        return(
                <section>
            {this.props.events.map(event=>
                <div className="card" key={event.id}>
                <div className="card-body">
                  <h5 className="card-title">{event.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{event.date}</h6>
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
                <button type="button" className="btn btn-dark" onClick={() => {
                                this.props.history.push("/events/new")}}>Add Event</button>

                </section>
        )
    }
}