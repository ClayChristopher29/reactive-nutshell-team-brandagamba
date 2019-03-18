import React, { Component } from "react"

export default class NewsForm extends Component {


    // Set initial state
    state = {
        title: "",
        synopsis: "",
        url: "",
        date: "",

        //Must change this after login is working!!!
        userId: 1,

    };

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    /*
          Local method for validation, creating news object, and
          invoking the function reference passed from parent component
       */
    constructNewArticle = evt => {
        evt.preventDefault();

        // build date and time component based on current date and time
        const today = new Date();
        const date = (today.getMonth() + 1) + '-' + today.getDate()+ '-' + today.getFullYear() ;
        const time = today.getHours() + ":" + today.getMinutes();
        const dateTime = date + ' ' + time;

        console.log(dateTime)

        const article = {

            title: this.state.title,
            synopsis: this.state.synopsis,
            url: this.state.url,
            date: dateTime,
            //Make sure the user ID is saved to the database as an integer
            userId: parseInt(this.state.userId)


        };

        // Create the article and redirect user to news list
        this.props.addNewArticle(article)
        this.props.history.push("/")
    }


    render() {
        return (
            <React.Fragment>
                <form className="NewsForm">
                    <div className="form-group">
                        <label htmlFor="title">Article Title</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="title"
                            placeholder="Article Title"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="synopsis">Synopsis</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="synopsis"
                            placeholder="Synopsis"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="url">Link</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="url"
                            placeholder="HTML link"
                        />
                    </div>




                    <button
                        type="submit"
                        onClick={this.constructNewArticle}
                        className="btn btn-success"
                    >
                        Submit
          </button>
                </form>
            </React.Fragment>
        );
    }
}





