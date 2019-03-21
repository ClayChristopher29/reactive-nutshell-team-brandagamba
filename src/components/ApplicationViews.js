import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
// Comment or uncomment your import as needed
import UserAPIManager from "../modules/UserManager"
// import EventAPIManager from "../modules/EventManager"
// import NewsAPIManager from "../modules/NewsManager"
// import MessageAPIManager from "../modules/MessageManager"
// import FriendAPIManager from "../modules/FriendManager"
// import FriendList from "./friends/FriendList"
import NoteAPIManager from "../modules/NoteManager"
import NoteList from "./notes/NoteList"
import AddNote from "./notes/AddNote"
export default class ApplicationViews extends Component {


  state = {
    users: [],
    events: [],
    news: [],
    messages: [],
    friends: [],
    notes: []
  }

  // Check if credentials are in local storage
  // isAuthenticated = () => sessionStorage.getItem("credentials") !== null
  deleteNote = id => {
    return NoteAPIManager.deleteNote(id)
      .then(() => NoteAPIManager.getAllNotes())
      .then(notes => this.setState({
        notes: notes
      })
      )
  }

  addNote = notes =>
    NoteAPIManager.postNote(notes)
      .then(() => NoteAPIManager.getAllNotes())
      .then(notes =>
        this.setState({
          notes: notes
        })
      );

  componentDidMount() {

    const newState = {}

    // Get all info from the API and set state
    // comment or uncomment your module as needed

    UserAPIManager.getAllUsers()
      .then(users => newState.users = users)
      //             .then(EventAPIManager.getAllEvents)
      //             .then(events => newState.events = events)
      //             .then(NewsAPIManager.getAllNews)
      //             .then(news => newState.news = news)
      //             .then(MessageAPIManager.getAllMessages)
      //             .then(messages => newState.messages = messages)
      // .then(FriendAPIManager.getAllFriends)
      // .then(friends => newState.friends = friends)
      .then(NoteAPIManager.getAllNotes)
      .then(notes => newState.notes = notes)
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
          path="/events" render={props => {
            return null
            // Remove null and return the component which will show list of events
          }}
        />

        <Route
          path="/friends" render={props => {
            return null
            // Remove null and return the component which will show the messages
          }}
        />

        <Route
          path="/notes" render={props => {
            return <NoteList {...props}
              deleteNote={this.deleteNote}
              addNote={this.addNote}
              notes={this.state.notes}
            />
          }}


        />
   <Route path="/notes/new" render={(props) => {
                    return <AddNote {...props}
                        addNote={this.addNote}
                        notes={this.state.notes}
                        users={this.state.users}
                    />


                }} />


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
