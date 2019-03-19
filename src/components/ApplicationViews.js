import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
// Comment or uncomment your import as needed
import UserAPIManager from "../modules/UserManager"
import EventAPIManager from "../modules/EventManager"
// import MessageAPIManager from "../modules/MessageManager"
// import FriendAPIManager from "../modules/FriendManager"
import EventList from './event/EventList'
import EventForm from './event/EventForm'
import EventEditForm from './event/EventEditForm'
import NewsAPIManager from "../modules/NewsManager"
import NewsList from "./news/NewsList"
import NewsForm from "./news/NewsForm"
import NewsEditForm from "./news/NewsEditForm"


export default class ApplicationViews extends Component {


  state = {
    users: [],
    events: [],
    news: [],
    messages: [],
    friends: [],
    activeUser: "1"

  }

  // when login/register route is created, the onClick function will be handled here.
  // Set session storage, make api calls to get news/events/chat etc for this user
  // and set the state.


  // Check if credentials are in local storage
  // isAuthenticated = () => sessionStorage.getItem("credentials") !== null


// ********** Event Functions ***********
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


updateEvent = (eventObj) => {
  EventAPIManager.updateEventAndList(eventObj)
  .then(events => this.setState({
    events: events
  }))
}







  // activeUser=sessionStorage.getItem(activeUser)

  componentDidMount() {




    const newState = {}

    // Get all info from the API and set state
    // comment or uncomment your module as needed


           UserAPIManager.getAllUsers()
                .then(users => newState.users = users)
                .then(EventAPIManager.getAllEvents)
                .then(events => newState.events = events)
                .then(NewsAPIManager.getAllNews)
                .then(news => newState.news = news)
    //             .then(MessageAPIManager.getAllMessages)
    //             .then(messages => newState.messages = messages)
    //             .then(FriendAPIManager.getAllFriends)
    //             .then(friends => newState.friends = friends)
                .then(() => this.setState(newState))


  }


  deleteArticle = (id) => {
    return NewsAPIManager.deleteArticle(id)
      .then(() => NewsAPIManager.getAllNews(this.state.activeUser))
      .then(news => this.setState({
        news: news

      })
      )
  }
  addNewArticle = (newArticle) => {
    return NewsAPIManager.addNewArticle(newArticle)
      .then(() => NewsAPIManager.getAllNews(this.state.activeUser))
      .then(news => this.setState({
        news: news

      })
      )
  }


  editArticle = (editedArticle) => {
    return NewsAPIManager.editArticle(editedArticle)
      .then(() => NewsAPIManager.getAllNews(this.state.activeUser))
      .then(news => this.setState({
        news: news
      })
      )
  }


  render() {
    return (
      <React.Fragment>

        <Route
          exact path="/" render={props => {
            return <NewsList {...props}
              news={this.state.news}
              deleteArticle={this.deleteArticle} />

          }} />
        <Route
          path="/news/new" render={props => {
            return <NewsForm {...props}
              news={this.state.news}
              addNewArticle={this.addNewArticle}
            />

          }} />
        <Route
          path="/news/:newsId(\d+)/edit" render={props => {
            return <NewsEditForm {...props}
              news={this.state.news}
              editArticle={this.editArticle}
            />

          }} />


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
           path="/events/:eventId(\d+)/edit" render={props => {
            return <EventEditForm  {...props} events={this.state.events} updateEvent={this.updateEvent}/>
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
