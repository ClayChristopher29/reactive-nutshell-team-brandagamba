import React, { Component } from "react"
import "./Friends.css"
import friendAuthentication from "../../modules/FriendAuthentication"
import AuthenticationManager from "../../modules/AuthenticationManager"

export default class FriendList extends Component {

    state = {
        activeUser: parseInt(this.props.activeUser),
        // friendsWithStuff: "",
        // testState: [],
        addFriend: "",
        errorStatement:"",

    }


    // I'm not actually using this but I am leaving it in so I can see how it is done!
    // It sets state based on props it recieves from Application views
    // before the component mounts
    // static getDerivedStateFromProps = (props, state) => {

    //     // find all the friends when the active user is in the userId place
    //     const filteredbyUser = props.friends.filter((friend) => friend.userId === parseInt(props.activeUser))
    //     const mappedbyUser = filteredbyUser.map((each) => each.otherFriendId)
    //     console.log(mappedbyUser)

    //     // find all the friends when the active user is in the otherFriendId place
    //     const filteredbyFriend = props.friends.filter((friend) => friend.otherFriendId === parseInt(props.activeUser))
    //     const mappedbyFriend = filteredbyFriend.map((each) => each.userId)
    //     console.log(mappedbyFriend)
    //     // Concatenate the arrays together to form one array
    //     const friendArray = mappedbyFriend.concat(mappedbyUser)
    //     console.log(friendArray)
    //     const friendsWithStuff = []
    //     friendArray.forEach(id => {
    //         const friendWithStuff = props.users.find((user) => user.id === id)
    //         console.log(friendWithStuff)
    //         friendsWithStuff.push(friendWithStuff)


    //     }
    //     )

    //     //  const testArray = this.test(props.users, props.friends, props.activeUser)
    //     return { friendsWithStuff: friendsWithStuff }
    // }

    // test = (users, friends, activeUser) => {
    //     // find all the friends when the active user is in the userId place
    //     const filteredbyUser = friends.filter((friend) => friend.userId === parseInt(activeUser))
    //     const mappedbyUser = filteredbyUser.map((each) => each.otherFriendId)
    //     // console.log(mappedbyUser)

    //     // find all the friends when the active user is in the otherFriendId place
    //     const filteredbyFriend = friends.filter((friend) => friend.otherFriendId === parseInt(activeUser))
    //     const mappedbyFriend = filteredbyFriend.map((each) => each.userId)
    //     // console.log(mappedbyFriend)
    //     // Concatenate the arrays together to form one array
    //     const friendArray = mappedbyFriend.concat(mappedbyUser)
    //     // console.log(friendArray)
    //     const friendsWithStuff = []
    //     friendArray.forEach(id => {
    //         const friendWithStuff = users.find((user) => user.id === id)
    //         // console.log(friendWithStuff)
    //         friendsWithStuff.push(friendWithStuff)


    //     }
    //     )
    // }


    // this function handles the input fields and automatically sets the variable in state
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };





    // Give this function friendId, currentUsername, friendsWithStuff
    AuthenticateFriend=(friendName, currentUsername, friendsWithStuff)=>{
        AuthenticationManager.checkForUsername(friendName).then(user => {
            const returned = friendAuthentication(user, friendName, currentUsername, friendsWithStuff)

            // if returned is a string, print the error message.  Otherwise post new friend to database
            typeof returned === "string" ? this.setState({errorStatement:returned}):this.props.addNewFriend(returned)
            this.props.history.push("/friends")

        }
        )}



    render() {



        return (
            <React.Fragment>

                <h1>Friends</h1>
                <input
                    id="addFriend"
                    type="text"
                    placeholder="enter username"
                    onChange={this.handleFieldChange}></input>
                <button className="btn btn-add-friend btn-secondary"
                onClick={()=>{
                this.AuthenticateFriend(this.state.addFriend, this.props.currentUsername, this.props.friendsWithStuff)}}

                >
                Add a Friend</button>
                <span className="errorStatement">{this.state.errorStatement}</span>
                {this.props.friendsWithStuff.map((friend) =>
                    <div key={friend.id} className="card">
                        <div className="card">
                            <div className="card-title">

                                <span className="friendName">{friend.username}</span><button className="btn-sm btn-del-friend btn-danger"
                                    onClick={() => {
                                        // need to figure out friendship ID!!
                                        this.props.deleteFriend(friend.friendshipId)
                                        // this.props.history.push("/friends")
                                    }}>Delete Friend</button>
                                {(friend.news.length ? <h5>Articles</h5> : "")}
                                {friend.news.map((article) =>
                                    <p className="friendStyle">{article.title}</p>)}
                                {(friend.events.length ? <h5>Events</h5> : "")}
                                {friend.events.map((event) =>
                                    <p className="friendStyle">{event.name}</p>)}

                            </div>
                        </div>
                    </div>

                )}


            </React.Fragment>
        )

    }

}
