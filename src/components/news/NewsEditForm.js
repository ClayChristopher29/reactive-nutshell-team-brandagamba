import React, { Component } from "react"
import NewsAPIManager from "../../modules/NewsManager"

export default class NewsEditForm extends Component {


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
    editArticle = evt => {
        evt.preventDefault();

        const article = {
            id: this.props.match.params.newsId,
            title: this.state.title,
            synopsis: this.state.synopsis,
            url: this.state.url,
            date: this.state.date,
            //Make sure the user ID is saved to the database as an integer
            userId: parseInt(this.state.userId)


        };

        // Create the animal and redirect user to news list
        NewsAPIManager.editArticle(article)
        this.props.history.push("/news")
    }
    componentDidMount() {
        NewsAPIManager.getSingleArticle(this.props.match.params.newsId)
        .then(news => {
          this.setState({
            title: news.title,
            synopsis: news.synopsis,
            url: news.url,
            date: news.date,
            userId: news.userId
          });
        });
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
                            value={this.state.title}
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
                            value={this.state.synopsis}
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
                            value={this.state.url}
                        />
                    </div>




                    <button
                        type="submit"
                        onClick={this.editArticle}
                        className="btn btn-success"
                    >
                        Submit
          </button>
                </form>
            </React.Fragment>
        );
    }
}





