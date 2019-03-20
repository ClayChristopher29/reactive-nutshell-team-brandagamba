import React, { Component } from "react"
import './Messages.css'





export default class MessageList extends Component {
    // define state
    state = {
        activeUser: this.props.activeUser,
        message: "",
        messageToEdit: "",
        someElement: ""
    }

    componentDidMount = () => {
        // Get a reference to the div you want to auto-scroll.
        // const someElement = document.querySelector('.message-container');
        const someElement = this.messageContainer.current
        // Create an observer and pass it a callback.
        const observer = new MutationObserver(() => this.scrollToBottom(someElement));
        // Tell it to look for new children that will change the height.
        const config = { childList: true };
        observer.observe(someElement, config);


    }
    scrollToBottom = (someElement) => {
        someElement.scrollTop = someElement.scrollHeight;
    }

    constructor(props) {
        super(props);
        // create refs that will allow you to select dom elements
        this.messageContainer = React.createRef();
        this.messageInput = React.createRef()
    }


    renderSingleMessage = (message) => {
        // this react fragement will allow you to render each message individually
        return (
            <React.Fragment>


                <span>- {message.message}</span>
                {/* check to see if the message is from the current user and add an edit button */}
                {(message.userId === parseInt(this.state.activeUser) ?
                    <button className="btn-sm msg-edit-sm btn-primary"
                        onClick={() => this.setState({ messageToEdit: message, message: message.message })}>edit</button>
                    : "")}

                <p></p>


            </React.Fragment>
        )
    }
    renderEditForm = () => {
        // this react fragment will allow you to render an edit form in the messages field
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
                    className="btn-sm msg-submit-sm btn-success"
                >Submit</button>

            </React.Fragment>)

    }

    editThisMessage = () => {
        // this function allows you to create an edited message and PUT it to the database
        const editedMessage = {

            userId: parseInt(this.state.activeUser),
            message: this.state.message,
            timestamp: this.state.messageToEdit.timestamp,
            id: this.state.messageToEdit.id
        }
        console.log("edited Message", editedMessage)
        //call "PUT" function to edit message in the database and refresh
        this.props.editMessage(editedMessage)
        // this.props.history.push("/messages")


    }
    addFriend = (message) => {

        window.alert("you clicked on", message)


    }

    // this function handles the input fields and automatically sets the variable in state
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    // this function is called by the submit button to create a new message to POST
    constructNewMessage = () => {
        // clear the message input field and reset to default
        const inputNode = this.messageInput.current
        inputNode.value = ""


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
                <div className="message-container" ref={this.messageContainer}>
                    {this.props.messages.map((message) =>


                        <React.Fragment>
                            <a href="" onClick={()=>this.addFriend(message.user.username)}>
                                {/* check to see if the message is from the current user and set styling accordingly */}
                                <span className={(message.userId === parseInt(this.state.activeUser) ? "current" : "other")}>
                                    {message.user.username}</span></a>
                            {/* Check to see if the edit button has been clicked.  If so, display the form for that msg */}
                            {(this.state.messageToEdit.id === message.id ?
                                <form>{this.renderEditForm(message)}</form> :
                                <span>{this.renderSingleMessage(message)}</span>)}

                        </React.Fragment>
                    )}
                </div>

                <div className="messageField">
                    <div className="message-input">
                        <textarea
                            className="message-input"
                            ref={this.messageInput}
                            type="textarea"
                            id="message"
                            placeholder="enter message"
                            onChange={this.handleFieldChange}
                        ></textarea></div>

                    <div className="MessageButton">
                        <button type="button"
                            className="btn msg-submit btn-success"
                            onClick={this.constructNewMessage}>submit
                    </button>
                    </div>
                </div>

            </section>

        </React.Fragment>

    }

}