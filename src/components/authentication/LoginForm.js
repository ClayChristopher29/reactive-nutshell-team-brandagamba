// Add log out function to nav bar
import React, {Component} from "react"

export default class LoginForm extends Component {

    state = {
        username: "",
        email: "",
        errorMessage: ""
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    //log in handle function to set to session storage
    logInUser = evt => {
        let errorMessage = ""
        evt.preventDefault();
        this.props.checkUserName(this.state.username).then(user => {
            if(user.length > 0){
                this.props.checkUserEmail(this.state.email)
                .then(user =>
                    {if(user.length > 0){
                        sessionStorage.setItem("activeUser", user[0].id)
                        console.log(user)
                        console.log(user[0].id)
                        this.props.history.push("/")
                        this.props.mountUponLogin()
                    } else {
                        errorMessage = "This username and email combination does not exist. Please try again or register!"
                        this.setState({
                            errorMessage : errorMessage
                        })
                    }
                })
            } else {
                errorMessage = "This username does not exist. Please try again or register!"
                this.setState({
                    errorMessage: errorMessage
                })
            }
        })
    }




    render(){

        return(
            <React.Fragment>
            <h1>Please Sign In</h1>
            <form>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Username</label>
                <input type="text" className="form-control" id="username" placeholder="Enter username" onChange={this.handleFieldChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="email" className="form-control" id="email" placeholder="Email Address" onChange={this.handleFieldChange}/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={this.logInUser}>Submit</button>
            <button className="btn btn-secondary" onClick={() => {this.props.history.push("/register")}}>Register</button>
            </form>
            <h4>{this.state.errorMessage}</h4>
            </React.Fragment>

        )
    }

}