import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
// Comment or uncomment your import as needed
import UserAPIManager from "../modules/UserManager"
import EventAPIManager from "../modules/EventManager"
// import NewsAPIManager from "../modules/NewsManager"
// import MessageAPIManager from "../modules/MessageManager"
// import FriendAPIManager from "../modules/FriendManager"
import EventList from './event/EventList'
import EventForm from './event/EventForm'
import EventEditForm from './event/EventEditForm'


export default class ApplicationViews extends Component {


  state = {
    users: [],
    events: [],
    news: [],
    messages: [],
    friends: [],

  }

  // Check if credentials are in local storage
  // isAuthenticated = () => sessionStorage.getItem("credentials") !== null


addEvent = (event) => {
  EventAPIManager.addEventAndList(event)
  .then(events => this.setState({
    events: events
  }
))
}

deleteEvent = (id) => {
  EventAPIManager.deleteEventAndList(id)
  .then(events => this.setState({
    events: events
  })
  )}


updateEvent = (id) => {
  EventAPIManager.updateEventAndList(id)
  .then(events => this.setState({
    events: events
  }))
}







  componentDidMount() {

    const newState = {}

    // Get all info from the API and set state
    // comment or uncomment your module as needed

           UserAPIManager.getAllUsers()
                .then(users => newState.users = users)
                .then(EventAPIManager.getAllEvents)
                .then(events => newState.events = events)
    //             .then(NewsAPIManager.getAllNews)
    //             .then(news => newState.news = news)
    //             .then(MessageAPIManager.getAllMessages)
    //             .then(messages => newState.messages = messages)
    //             .then(FriendAPIManager.getAllFriends)
    //             .then(friends => newState.friends = friends)
                .then(() => this.setState(newState))

  }

  render() {
    return (
      <React.Fragment>

        <Route
          exact path="/" render={props => {
            return null
            // Remove null and return the component which will show news articles
          }}
        />
        <Route
          exact path="/events" render={props => {
            return <EventList {...props} events={this.state.events} deleteEvent={this.deleteEvent} />
          }}
        />
        <Route
           path="/events/new" render={props => {
            return <EventForm  {...props} events={this.state.events} addEvent={this.addEvent}/>
          }}
        />
         <Route
           path="/events/edit" render={props => {
            return <EventEditForm  {...props} events={this.state.events} updateEvent={this.addEvent}/>
          }}
        />


        {/* <Route
          path="/friends" render={props => {
            return null
            // Remove null and return the component which will show list of friends
          }}
        /> */}

        <Route
          path="/messages" render={props => {
            return null
            // Remove null and return the component which will show the messages
          }}
        />

        <Route
          path="/tasks" render={props => {
            return null
            // Remove null and return the component which will show the user's tasks
          }}
        />

      </React.Fragment>
    );
  }
}
