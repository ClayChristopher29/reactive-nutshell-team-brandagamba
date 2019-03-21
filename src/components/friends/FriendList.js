import React, { Component } from "react"
import "./Friends.css"

export default class FriendList extends Component {

    state = {
        activeUser: parseInt(this.props.activeUser),
        friendsWithStuff: "",
        testState: []
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


    render() {



        return (
            <React.Fragment>

                <h1>Friends</h1>
                {this.props.friendsWithStuff.map((friend) =>
                    <div key={friend.id} className="card">
                        <div className="card">
                            <div className="card-title">

                                <span className="friendName">{friend.username}</span><button className="btn-sm btn-danger"
                                        onClick={() => {
                                            this.props.deleteArticle(friend.id)
                                            this.props.history.push("/")
                                        }}>Delete Friend</button>
                                {(friend.news.length?<h5>Articles</h5>:"")}
                                    {friend.news.map((article) =>
                                        <p>{article.title}</p>)}
                                        {(friend.events.length?<h5>Events</h5>:"")}
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
