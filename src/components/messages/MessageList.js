import React, { Component } from "react"
import './Messages.css'



export default class MessageList extends Component {

    state = {
        activeUser: this.props.activeUser,
        message: ""
    }


    currentUserMsg = (message) => {
        return (
            <React.Fragment>

                <div><a href=""><span className="current">{message.user.username}</span></a>
                    <span>- {message.message}</span>
                    <button className="btn btn-primary">edit</button>
                    <p></p>
                </div>
            </React.Fragment>
        )
    }
    handleEdit = (message) => {
        console.log("inside edit")
        return <form>
            <div className="form-group">
                <label htmlFor="message">Link</label>
                <input
                    type="text"
                    required
                    className="form-control"
                    onChange={this.handleFieldChange}
                    id="message"
                    value={message}
                />
            </div>
            <button
                type="submit"
                onClick={this.editThisMessage}
                className="btn btn-success"
            >Submit</button>
        </form>


    }

    editThisMessage=()=>{



    }



    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    constructNewMessage = () => {

        // build date and time component based on current date and time
        const today = new Date();
        const date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();
        const time = (today.getHours() < 10 ? "0" : "") + today.getHours() + ":" + (today.getMinutes() < 10 ? "0" : "") + today.getMinutes();
        const dateTime = date + ' ' + time;

        const messageToPost = {
            userId: parseInt(this.state.activeUser),
            message: this.state.message,
            timestamp: dateTime
        }

        //call "POST" function to add message to database and refresh
        this.props.addNewMessage(messageToPost)
        this.props.history.push("/messages")
    }

    render() {
        return <React.Fragment>
            <section className="messages-section">
                <h2> Messages</h2>
                <div className="message-container">
                    {this.props.messages.map((message) =>
                        <div id={message.id}><a href="">
                            {/* check to see if the message is from the current user and set styling accordingly */}
                            <span className={(message.userId === parseInt(this.state.activeUser) ? "current" : "other")}>
                                {message.user.username}</span></a>
                            <span>- {message.message}</span>
                            {/* check to see if the message is from the current user and add an edit button */}
                            {(message.userId === parseInt(this.state.activeUser) ?
                                <button className="btn-sm btn-primary"
                                    onClick={()=>this.handleEdit(message[message])}>edit</button>
                                : "")}

                            <p></p>
                        </div>
                    )}
                </div>

                <div className="messageField">
                    <span className="message-input">
                        <input
                            id="message"
                            placeholder="enter message"
                            onChange={this.handleFieldChange}
                        ></input></span>

                    <span className="MessageButton">
                        <button type="button"
                            className="btn btn-success"
                            onClick={this.constructNewMessage}>submit
                    </button>
                    </span>
                </div>

            </section>

        </React.Fragment>

    }

}