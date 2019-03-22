import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
// Comment or uncomment your import as needed
import UserAPIManager from "../modules/UserManager"
import NewsAPIManager from "../modules/NewsManager"
import MessageAPIManager from "../modules/MessageManager"
import EventAPIManager from "../modules/EventManager"
import FriendAPIManager from "../modules/FriendManager"
import NoteAPIManager from "../modules/NoteManager"
import NoteList from "./notes/NoteList"
import NoteEditForm from './notes/NoteEditForm'
import AddNote from "./notes/AddNote"
import EventList from './event/EventList'
import EventForm from './event/EventForm'
import EventEditForm from './event/EventEditForm'
import TaskAPIManager from "../modules/TaskManager"
import TaskList from "./tasks/TaskList"
import TaskEditForm from "./tasks/TaskEditForm"
import TaskForm from "./tasks/TaskForm"
import NewsList from "./news/NewsList"
import NewsForm from "./news/NewsForm"
import NewsEditForm from "./news/NewsEditForm"
import AuthenticationManager from "../modules/AuthenticationManager"
import RegisterForm from "./authentication/RegisterForm"
import LoginForm from "./authentication/LoginForm"
import MessageList from "./messages/MessageList"
import FriendList from "./friends/FriendList"
import NewModalForm from "./tasks/NewModalForm"



export default class ApplicationViews extends Component {

  state = {
    users: [],
    events: [],
    news: [],
    messages: [],
    friends: [],
    notes: [],
    tasks: [],
    activeUser: sessionStorage.getItem("activeUser"),
    friendsWithStuff: [],
    currentUsername: ""
  }

  // when login/register route is created, the onClick function will be handled here.
  // Set session storage, make api calls to get news/events/chat etc for this user
  // and set the state.


  // Check if credentials are in local storage
  // isAuthenticated = () => sessionStorage.getItem("credentials") !== null

  //Note functions
  deleteNote = id => {
    return NoteAPIManager.deleteNote(id)
      .then(() => NoteAPIManager.getAllNotes(this.state.activeUser))
      .then(notes => this.setState({
        notes: notes
      })
      )
  }

  addNote = notes =>
    NoteAPIManager.postNote(notes)
      .then(() => NoteAPIManager.getAllNotes(this.state.activeUser))
      .then(notes =>
        this.setState({
          notes: notes
        })
      );

  updateNote = editedNoteObject => {
    return NoteAPIManager.updateNote(editedNoteObject)
      .then(() => NoteAPIManager.getAllNotes(this.state.activeUser))
      .then(notes => this.setState({
        notes: notes
      }))
  }

  // ********** Event Functions ***********
  addEvent = (event) => {
    EventAPIManager.addEventAndList(event)
      .then(() => EventAPIManager.getAllEvents(this.state.activeUser))
      .then(events => this.setState({
        events: events
      }
      ))
  }

  deleteEvent = (id) => {
    EventAPIManager.deleteEventAndList(id)
      .then(() => EventAPIManager.getAllEvents(this.state.activeUser))
      .then(events => this.setState({
        events: events
      })
      )
  }


  updateEvent = (eventObj) => {
    EventAPIManager.updateEventAndList(eventObj)
      .then(() => EventAPIManager.getAllEvents(this.state.activeUser))
      .then(events => this.setState({
        events: events
      }))
  }
  buildFriendArray = (friends, users) => {
    const activeUser = parseInt(sessionStorage.getItem("activeUser"))

    // find all the friends when the active user is in the userId place
    const filteredbyUser = friends.filter((friend) => {
      return friend.userId === activeUser
    })

    const mappedbyUser = filteredbyUser.map((each) => [each.otherFriendId, each.id])
    console.log(mappedbyUser)

    // find all the friends when the active user is in the otherFriendId place
    const filteredbyFriend = friends.filter((friend) => friend.otherFriendId === activeUser)
    const mappedbyFriend = filteredbyFriend.map((each) => [each.userId, each.id])
    // console.log(mappedbyFriend)
    // Concatenate the arrays together to form one array
    const friendArray = mappedbyFriend.concat(mappedbyUser)
    console.log(friendArray)
    const friendsWithStuff = []
    friendArray.forEach(id => {
      console.log("id", id)
      const friendWithStuff = users.find((user) => user.id === id[0])
      // Attach the friendship id to the friend object
      friendWithStuff.friendshipId=id[1]
      console.log(friendWithStuff)
      friendsWithStuff.push(friendWithStuff)

    })
    this.setState({ friendsWithStuff: friendsWithStuff })

    UserAPIManager.getSingleUser(activeUser)
      .then(user => { this.setState({ currentUsername: user.username }) })


    // return friendsWithStuff

  }


  mountUponLogin = () => {
    const activeUser = sessionStorage.getItem("activeUser")
    this.setState({ activeUser: activeUser })
    const newState = {}

    // Get all info from the API and set state
    // comment or uncomment your module as needed

    UserAPIManager.getAllUsers()
      .then(users => newState.users = users)
      .then(() => NoteAPIManager.getAllNotes(this.state.activeUser))
      .then(notes => newState.notes = notes)
      .then(() => EventAPIManager.getAllEvents(this.state.activeUser))
      .then(events => newState.events = events)
      .then(() => NewsAPIManager.getAllNews(this.state.activeUser))
      .then(news => newState.news = news)
      .then(MessageAPIManager.getAllMessages)
      .then(messages => newState.messages = messages)
      .then(FriendAPIManager.getAllFriends)
      .then(friends => newState.friends = friends)
      .then(() => TaskAPIManager.getAllTasks(this.state.activeUser))
      .then(tasks => newState.tasks = tasks)
      .then(() => {
        this.buildFriendArray(newState.friends, newState.users)
        this.setState(newState)
      })



    // this.buildFriendArray(newState)



  }

  componentDidMount() {
    this.mountUponLogin()
  }

  isAuthenticated = () => {
    return sessionStorage.getItem("activeUser") !== null
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
  addNewMessage = (newMessage) => {
    return MessageAPIManager.addNewMessage(newMessage)
      .then(MessageAPIManager.getAllMessages)
      .then(messages => this.setState({
        messages: messages
      })
      )
  }

  editMessage = (editedMessage) => {
    return MessageAPIManager.editMessage(editedMessage)
      .then(MessageAPIManager.getAllMessages)
      .then(messages => this.setState({
        messages: messages
      })
      )

  }


  addTask = taskObject => {
    return TaskAPIManager.addNewTask(taskObject)
      .then(() => TaskAPIManager.getAllTasks(this.state.activeUser))
      .then(tasks => this.setState({
        tasks: tasks
      }))
  }


  updateTask = editedTaskObject => {
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

  checkUserEmail = (email) => {
    return AuthenticationManager.checkForEmail(email)
  }

  checkUserName = (username) => {
    return AuthenticationManager.checkForUsername(username)
  }

  addUser = (userObject) => {
    return AuthenticationManager.registerNewUser(userObject)
  }


  addNewFriend = (friendObject) => {
    return FriendAPIManager.addNewFriend(friendObject)
      .then(FriendAPIManager.getAllFriends)
      .then(friends => {
        this.setState({ friends: friends })
        this.buildFriendArray(friends, this.state.users)
      })
  }

  deleteFriend = (id) => {
    return FriendAPIManager.deleteFriend(id)
      .then(FriendAPIManager.getAllFriends)
      .then(friends => {
        this.setState({ friends: friends })
        this.buildFriendArray(friends, this.state.users)
      })
  }





  loginCheck = (username, email) => {
    return AuthenticationManager.checkUsernameAndEmail(username, email)
  }


  render() {
    return (
      <React.Fragment>

        <Route
          exact path="/" render={props => {
            if (this.isAuthenticated()) {
              return <NewsList {...props}
                news={this.state.news}
                deleteArticle={this.deleteArticle} />
            } else {
              return <Redirect to="/login" />
            }
          }} />
        <Route
          path="/news/new" render={props => {
            if (this.isAuthenticated()) {
              return <NewsForm {...props}
                news={this.state.news}
                addNewArticle={this.addNewArticle}
                activeUser={this.state.activeUser}
              />
            } else {
              return <Redirect to="/login" />
            }

          }} />
        <Route
          path="/news/:newsId(\d+)/edit" render={props => {
            if (this.isAuthenticated()) {
              return <NewsEditForm {...props}
                news={this.state.news}
                editArticle={this.editArticle}
                activeUser={this.state.activeUser}
              />
            } else {
              return <Redirect to="/login" />
            }

          }} />


        <Route
          exact path="/events" render={props => {
            if (this.isAuthenticated()) {
              return <EventList {...props} events={this.state.events} deleteEvent={this.deleteEvent} />
            } else {
              return <Redirect to="/login" />
            }

          }}
        />
        <Route
          path="/events/new" render={props => {
            if (this.isAuthenticated()) {
              return <EventForm  {...props} events={this.state.events} addEvent={this.addEvent} />
            } else {
              return <Redirect to="/login" />
            }
          }}
        />
        <Route
          path="/events/:eventId(\d+)/edit" render={props => {
            if (this.isAuthenticated()) {
              return <EventEditForm  {...props} events={this.state.events} updateEvent={this.updateEvent} />
            } else {
              return <Redirect to="/login" />
            }
          }}
        />


        <Route
          path="/friends" render={props => {
            if (this.isAuthenticated()) {
              return <FriendList {...props}
                friends={this.state.friends}
                activeUser={this.state.activeUser}
                users={this.state.users}
                friendsWithStuff={this.state.friendsWithStuff}
                getFriendsWithStuff={this.getFriendsWithStuff}
                buildFriendArray={this.buildFriendArray}
                checkUsername={this.checkUserName}
                currentUsername={this.state.currentUsername}
                addNewFriend={this.addNewFriend}
                deleteFriend={this.deleteFriend} />
            }
            else {
              return <Redirect to="/login" />
            }
          }}
        />

        <Route
          exact path="/notes" render={props => {
            if (this.isAuthenticated()) {

              return <NoteList {...props}
                deleteNote={this.deleteNote}
                addNote={this.addNote}
                notes={this.state.notes}

              />
            } else {
              return <Redirect to="/login" />
            }
          }}
        />



        <Route exact path="/notes/new" render={(props) => {
          if (this.isAuthenticated()) {

            return <AddNote {...props}
              addNote={this.addNote}
              notes={this.state.notes}

            />
          } else {
            return <Redirect to="/login" />
          }

        }} />
        <Route
          exact path="/notes/:noteId(\d+)/edit" render={props => {
            if (this.isAuthenticated()) {
              return <NoteEditForm  {...props} notes={this.state.notes} updateNote={this.updateNote} />
            } else {
              return <Redirect to="/login" />
            }
          }}
        />

        <Route
          path="/messages" render={props => {
            if (this.isAuthenticated()) {
              return <MessageList {...props}
                activeUser={this.state.activeUser}
                messages={this.state.messages}
                deleteMessage={this.deleteMessage}
                addNewMessage={this.addNewMessage}
                editMessage={this.editMessage}
                addNewFriend={this.addNewFriend}
                friendsWithStuff={this.state.friendsWithStuff}
                currentUsername={this.state.currentUsername}/>

            } else {
              return <Redirect to="/login" />
            }


          }}
        />

        <Route
          exact path="/tasks" render={props => {
            if (this.isAuthenticated()) {
              return (
                <TaskList {...props} tasks={this.state.tasks} addTask={this.addTask} completeTask={this.completeTask}/>
              )
            } else {
              return <Redirect to="/login" />
            }


          }}
        />

        <Route path="/tasks/:taskId(\d+)/edit" render={props => {
          if (this.isAuthenticated()) {
            return (
              <TaskEditForm {...props} tasks={this.state.tasks} updateTask={this.updateTask} />
            )
          } else {
            return <Redirect to="/login" />
          }

        }} />

        <Route exact path="/tasks/new" render={props => {
          if (this.isAuthenticated()) {
            return (
              <TaskForm {...props} tasks={this.state.tasks} addTask={this.addTask} />
            )
          } else {
            return <Redirect to="/login" />
          }

        }} />

        <Route path="/register" render={props => {
          return (
            <RegisterForm {...props} users={this.state.users} checkUserEmail={this.checkUserEmail} checkUserName={this.checkUserName}
              addUser={this.addUser} mountUponLogin={this.mountUponLogin} />
          )
        }} />

        <Route exact path="/login" render={props => {
          return (
            <LoginForm {...props} checkUserName={this.checkUserName} loginCheck={this.loginCheck} checkUserEmail={this.checkUserEmail} users={this.state.users} mountUponLogin={this.mountUponLogin} />
          )
        }} />

        <Route path="/tasks/new" render={props => {
          return (
            <NewModalForm {...props} tasks={this.state.tasks}/>
          )
        }} />

      </React.Fragment>
    );
  }
}
