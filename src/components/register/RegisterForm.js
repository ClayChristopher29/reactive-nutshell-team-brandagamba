//Conditionally route in application views so you only see register until logged in
//Make register form
//fetch call to username to check for existing username
//fetch call to email to check for existing email
//conditional statement (array.length = 0) to create an account
//then post new user to database
//sessionStorage.setItem("activeUser") using object id just saved to database
//Set state to empty
//handleFieldChange to take values of input boxes and set new state
//create new user object

import React, {Component} from "react"

export default class RegisterForm extends Component {
    state = {

    }

    handleFieldChange = evt => {

    }

    createNewUser = evt => {


    }




    render(){
        return(
            <React.Fragment>
            <h1>Please Register</h1>
            <form>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
            </div>
            <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            </React.Fragment>

        )


    }

}