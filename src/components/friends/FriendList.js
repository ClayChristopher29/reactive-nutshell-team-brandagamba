import React, { Component } from "react"
import "./Friends.css"

export default class FriendList extends Component {

    state = {
        activeUser: parseInt(this.props.activeUser),
        friendsWithStuff: "",
        testState: [],
        addFriend: ""
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

    addNewFriend = () => {
        let friendIsNotSelf = ""
        let friendIsInDatabase = ""
        let friendIsNotFriend = ""
        let otherFriendId = ""

        // check to see if the name they input is in the database
        this.props.checkUsername(this.state.addFriend).then(user => {
            if (user.length) {
                friendIsInDatabase = true;
                otherFriendId = user.id
                console.log("friend is in database", friendIsInDatabase, user.id)
                // check to make sure they are not trying to add themself
                if (this.state.addFriend !== this.props.currentUsername) {
                    friendIsNotSelf = true;
                    console.log("friend is not self", friendIsNotSelf)
                }
                // check to make sure they are not already friends with that person
                const findFriend = this.props.friendsWithStuff.find((friend =>
                    friend.username === this.state.addFriend))

                if (!findFriend) {
                    friendIsNotFriend = true;
                    console.log("friend is not already friend", friendIsNotFriend)

                }
                // If criteris is met, add the friend to the database
                if (friendIsNotSelf === true && friendIsNotFriend === true) {
                    console.log("you can make a friend!")
                    const friendObject = {
                        userId: this.state.activeUser,
                        otherFriendId: otherFriendId
                    }
                    console.log(friendObject)
                    this.props.addNewFriend(friendObject)
                }


            }
        }
        )







        console.log(friendIsInDatabase, friendIsNotFriend, friendIsNotSelf)




    }


    render() {



        return (
            <React.Fragment>

                <h1>Friends</h1>
                <input
                    id="addFriend"
                    type="text"
                    placeholder="enter username"
                    onChange={this.handleFieldChange}></input>
                <button className="btn btn-secondary" onClick={this.addNewFriend}>Add a Friend</button>
                {this.props.friendsWithStuff.map((friend) =>
                    <div key={friend.id} className="card">
                        <div className="card">
                            <div className="card-title">

                                <span className="friendName">{friend.username}</span><button className="btn-sm btn-danger"
                                    onClick={() => {
                                        this.props.deleteArticle(friend.id)
                                        this.props.history.push("/")
                                    }}>Delete Friend</button>
                                {(friend.news.length ? <h5>Articles</h5> : "")}
                                {friend.news.map((article) =>
                                    <p>{article.title}</p>)}
                                {(friend.events.length ? <h5>Events</h5> : "")}
                                {friend.events.map((event) =>
                                    <p>{event.name}</p>)}

                            </div>
                        </div>
                    </div>

                )}


            </React.Fragment>
        )

    }

}
