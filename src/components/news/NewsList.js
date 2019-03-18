import React, { Component } from "react"


export default class NewsList extends Component {

  render() {
    console.log(this.props.news)

    return (
      <React.Fragment>
        <div className="NewsHeader">
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
            this.props.news.map((news) =>
              <div key={news.id} className="card">
                <div className="card">
                  <h5 className="card-title">

                    {news.title}{"\n"}
                    {news.synopsis}{"\n"}
                    <a href={news.url}>link</a>{"\n"}
                    {news.date}{"\n"}
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
                  </h5>
                </div>
              </div>

            )
          }
        </section>
      </React.Fragment>
    )
  }
}