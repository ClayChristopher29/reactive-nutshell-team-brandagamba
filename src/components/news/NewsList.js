import React, { Component } from "react"


export default class NewsList extends Component {

  render() {


    return (
      <React.Fragment>
        <div className="NewsHeader">
        <h1>News</h1>
          <div className="NewsButton">
            <button type="button"
              className="btn btn-secondary"
              onClick={() => {
                this.props.history.push("/news/new")
              }
              }>Add New Article
                    </button>
          </div>
        </div>


        <section className="news-section">
          {
            this.props.news.reverse().map((news) =>
              <div key={news.id} className="card">
                <div className="card">
                  <div className="card-title">

                    <h4><u>{news.title}</u></h4>
                    <p>{news.synopsis}</p>
                    <a href={news.url}>...more details</a>{"\n"}
                    <h6>{news.date}</h6>
                    <div className="button-div">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          this.props.history.push(`/news/${news.id}/edit`)

                        }}
                      >Edit</button>
                      <button className="btn btn-danger"
                        onClick={() => {
                          this.props.deleteArticle(news.id)
                          this.props.history.push("/")
                        }}>Delete</button>
                    </div>
                    </div>
                </div>
              </div>

            )
          }
        </section>
      </React.Fragment>
    )
  }
}