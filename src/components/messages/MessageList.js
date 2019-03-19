import React, { Component } from "react"
import './Messages.css'


export default class MessageList extends Component {

    state ={
        activeUser: "1"
    }


    currentUserMsg = (message) => {
        return(
        <React.Fragment>

            <div><a href=""><span className="current">{message.user.username}</span></a>
            <span>- {message.message}</span>
            <button className="btn btn-primary">edit</button>
                <p></p>
            </div>
        </React.Fragment>
        )
    }
    handleClick = (evt) => {


    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    render() {
        return <React.Fragment>
            <section className="messages-section">
                <h2> Messages</h2>
                <div className="message-container">
                    {this.props.messages.map((message) =>
                        <div><a href="">
                        {/* check to see if the message is from the current user and set styling accordingly */}
                        <span className ={(message.userId===parseInt(this.state.activeUser)?"current":"other")}>
                        {message.user.username}</span></a>
                        <span>- {message.message}</span>
                        {/* check to see if the message is from the current user and add an edit button */}
                        {(message.userId===parseInt(this.state.activeUser)?<button className="btn-sm btn-primary">edit</button>:"")}

                            <p></p>
                        </div>
                    )}
                </div>

                <div className="messageField">
                    <span className="message-input">
                        <input
                            placeholder="enter message"
                        ></input></span>

                    <span className="MessageButton">
                        <button type="button"
                            className="btn btn-success"
                            onClick={() => { this.handleClick() }
                            }>submit
                    </button>
                    </span>
                </div>

            </section>

        </React.Fragment>

    }

}