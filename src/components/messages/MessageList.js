import React, { Component } from "react"
import './Messages.css'



export default class MessageList extends Component {

    state = {
        activeUser: this.props.activeUser,
        message: "",
        messageToEdit: ""
    }


    renderSingleMessage = (message) => {
        return (
            <React.Fragment>


                <span>- {message.message}</span>
                {/* check to see if the message is from the current user and add an edit button */}
                {(message.userId === parseInt(this.state.activeUser) ?
                    <button className="btn-sm btn-primary"
                        onClick={() => this.setState({ messageToEdit: message, message:message.message })}>edit</button>
                    : "")}

                <p></p>


            </React.Fragment>
        )
    }
    renderEditForm = (message) => {

        console.log("inside edit")
        return (
            <React.Fragment>
                <div className="form-group">
                    <label htmlFor="message"></label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={this.handleFieldChange}
                        id="message"
                        value={this.state.message}
                    />
                </div>
                <button
                    type="submit"
                    onClick={this.editThisMessage}
                    className="btn-sm btn-success"
                >Submit</button>

            </React.Fragment>)


    }

    editThisMessage = () => {

        const editedMessage = {

            userId: parseInt(this.state.activeUser),
            message: this.state.message,
            timestamp: this.state.messageToEdit.timestamp,
            id: this.state.messageToEdit.id
        }
        console.log("edited Message" ,editedMessage)
        //call "PUT" function to edit message in the database and refresh
        this.props.editMessage(editedMessage)
        // this.props.history.push("/messages")


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

                        <React.Fragment>
                            <a href="">
                                {/* check to see if the message is from the current user and set styling accordingly */}
                                <span className={(message.userId === parseInt(this.state.activeUser) ? "current" : "other")}>
                                    {message.user.username}</span></a>
                            {(this.state.messageToEdit.id === message.id ?
                                <form>{this.renderEditForm(message)}</form> :
                                <span>{this.renderSingleMessage(message)}</span>)}

                        </React.Fragment>
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