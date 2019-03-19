import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
// Comment or uncomment your import as needed
import UserAPIManager from "../modules/UserManager"
// import EventAPIManager from "../modules/EventManager"
import NewsAPIManager from "../modules/NewsManager"
// import MessageAPIManager from "../modules/MessageManager"
// import FriendAPIManager from "../modules/FriendManager"
import TaskAPIManager from "../modules/TaskManager"
import TaskList from "./tasks/TaskList"
import TaskEditForm from "./tasks/TaskEditForm"
import TaskForm from "./tasks/TaskForm"
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
    tasks: [],
    activeUser: "1"

  }

  // when login/register route is created, the onClick function will be handled here.
  // Set session storage, make api calls to get news/events/chat etc for this user
  // and set the state.


  // Check if credentials are in local storage
  // isAuthenticated = () => sessionStorage.getItem("credentials") !== null
  // activeUser=sessionStorage.getItem(activeUser)
  componentDidMount() {




    const newState = {}

    // Get all info from the API and set state
    // comment or uncomment your module as needed

    UserAPIManager.getAllUsers()
      .then(users => newState.users = users)
      //             .then(EventAPIManager.getAllEvents)
      //             .then(events => newState.events = events)
      .then(() => NewsAPIManager.getAllNews(this.state.activeUser))
      .then(news => newState.news = news)
      //             .then(MessageAPIManager.getAllMessages)
      //             .then(messages => newState.messages = messages)
      //             .then(FriendAPIManager.getAllFriends)
      //             .then(friends => newState.friends = friends)
                      .then(() => TaskAPIManager.getAllTasks(this.state.activeUser))
                      .then(tasks => newState.tasks = tasks)
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
