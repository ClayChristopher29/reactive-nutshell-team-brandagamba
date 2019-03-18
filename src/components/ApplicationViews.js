import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
// Comment or uncomment your import as needed
// import UserAPIManager from "./users/UserManager"
// import EventAPIManager from "./events/EventManager"
// import NewsAPIManager from "./news/NewsManager"
// import MessageAPIManager from "./messages/MessageManager"
// import FriendAPIManager from "./friends/FriendManager"

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

componentDidMount(){

  const newState={}

  // Get all info from the API and set state
  // comment or uncomment your module as needed

//        UserAPIManager.getAllUsers()
//             .then(users => newState.users = users)
//             .then(EventAPIManager.getAllEvents)
//             .then(events => newState.events = events)
//             .then(NewsAPIManager.getAllNews)
//             .then(news => newState.news = news)
//             .then(MessageAPIManager.getAllMessages)
//             .then(messages => newState.messages = messages)
//             .then(FriendAPIManager.getAllFriends)
//             .then(friends => newState.friends = friends)
//             .then(() => this.setState(newState))


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
          path="/friends" render={props => {
            return null
            // Remove null and return the component which will show list of friends
          }}
        />

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
