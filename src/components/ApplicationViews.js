import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
// Comment or uncomment your import as needed
import UserAPIManager from "../modules/UserManager"
// import EventAPIManager from "../modules/EventManager"
// import NewsAPIManager from "../modules/NewsManager"
// import MessageAPIManager from "../modules/MessageManager"
// import FriendAPIManager from "../modules/FriendManager"
import TaskAPIManager from "../modules/TaskManager"
import TaskList from "./tasks/TaskList"
import TaskEditForm from "./tasks/TaskEditForm"
import TaskForm from "./tasks/TaskForm"

export default class ApplicationViews extends Component {


  state = {
    users: [],
    events: [],
    news: [],
    messages: [],
    friends: [],
    tasks: [],
    activeUser: 1

  }

  // Check if credentials are in local storage
  // isAuthenticated = () => sessionStorage.getItem("credentials") !== null

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
    //             .then(FriendAPIManager.getAllFriends)
    //             .then(friends => newState.friends = friends)
                    .then(() => TaskAPIManager.getAllTasks(this.state.activeUser))
                    .then(tasks => newState.tasks = tasks)
                    .then(() => this.setState(newState))

  }


  addTask(taskObject) {
    return TaskAPIManager.addNewTask(taskObject)
    .then(() => TaskAPIManager.getAllTasks(this.state.activeUser))
    .then(tasks => this.setState({
      tasks: tasks
    }))
  }


  updateTask = editedTaskObject =>  {
      return TaskAPIManager.editTask(editedTaskObject)
      .then(() => TaskAPIManager.getAllTasks(this.state.activeUser))
      .then(tasks => this.setState({
        tasks: tasks
      }))
  }

  completeTask = (taskObject, taskId) => {
    return TaskAPIManager.completeTask(taskObject, taskId)
    .then(() => TaskAPIManager.getAllTasks(this.state.activeUser))
    .then(tasks => this.setState({
      tasks: tasks
    }))
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
          exact path="/tasks" render={props => {
            return (
              <TaskList {...props} tasks={this.state.tasks} completeTask={this.completeTask}/>
            )

          }}
        />

        <Route path="/tasks/:taskId(\d+)/edit" render={props => {
          return (
            <TaskEditForm {...props} tasks={this.state.tasks} updateTask={this.updateTask}/>
          )
        }} />

        <Route exact path="/tasks/new" render={props=> {
          return (
            <TaskForm {...props} tasks={this.state.tasks} addTask={this.addTask}/>
          )
        }}/>

      </React.Fragment>
    );
  }
}
