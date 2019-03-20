
import React, {Component} from "react"

export default class RegisterForm extends Component {
    //creates new state

    state = {
        username: "",
        email: "",
        errorMessage: ""
    }

    //Handles form imputs and sets them to state

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange)
    }

    //Checks to see if username or password are already in database. If in database, they will receive an alert and not be able to create an account, otherwise, their information will be posted to the database and they will be logged in with session storage

    createNewUser = evt => {
        evt.preventDefault()
        let errorMessage = ""
        this.props.checkUserName(this.state.username).then(user => {
                if(user.length === 0){
                    this.props.checkUserEmail(this.state.email).then(user => {
                        if(user.length ===0){
                            const newUser = {
                                username: this.state.username,
                                email: this.state.email
                            }
                            console.log(newUser)
                        this.props.addUser(newUser).then(newUser => {
                            sessionStorage.setItem("activeUser", newUser.id)
                            this.props.history.push("/")
                        })
                        } else {
                            errorMessage = "That email is already registered. Please register with a new email!"
                            this.setState({
                                errorMessage: errorMessage
                            })

                    }})
                } else {
                errorMessage = "That username is already taken. Please enter a different username!"
                this.setState({
                    errorMessage: errorMessage
                })
            }
        })
    }



    //Returns form and/or error message
    render(){
        return(
            <React.Fragment>
            <h1>Please Register</h1>
            <form>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Username</label>
                <input type="text" className="form-control" id="username" placeholder="Enter username" onChange={this.handleFieldChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Email Address</label>
                <input type="email" className="form-control" id="email" placeholder="Email Address" onChange={this.handleFieldChange}/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={this.createNewUser}>Submit</button>
            </form>
            <h4>{this.state.errorMessage}</h4>
            </React.Fragment>

        )
    }
}