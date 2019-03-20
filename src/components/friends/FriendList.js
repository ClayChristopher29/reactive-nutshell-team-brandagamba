import React, { Component } from "react"
import UserApiManager from "../../modules/UserManager"

export default class FriendList extends Component {

    state = {
        activeUser: parseInt(this.props.activeUser),
        friends: ""
    }

    buildFriendArray = () => {

        // find all the friends when the active user is in the userId place
        const filteredbyUser = this.props.friends.filter((friend) => friend.userId === this.state.activeUser)
        const mappedbyUser = filteredbyUser.map((each) => each.otherFriendId)
        console.log(mappedbyUser)

        // find all the friends when the active user is in the otherFriendId place
        const filteredbyFriend = this.props.friends.filter((friend) => friend.otherFriendId === this.state.activeUser)
        const mappedbyFriend = filteredbyFriend.map((each) => each.userId)
        console.log(mappedbyFriend)
        // Concatenate the arrays together to form one array
        const friendArray = mappedbyFriend.concat(mappedbyUser)
        console.log(friendArray)
        return friendArray

    }


    render() {
        const friendArray=this.buildFriendArray()



        return (
            <React.Fragment>

                <h1>Friends</h1>
                <div></div>

            </React.Fragment>
        )

    }

}
