export default {

    getAllNews: (id) => {
      return fetch(`http://localhost:5002/news/?userId=${id}`)
        .then(r => r.json())
    },
    getSingleArticle: (id) => {
      return fetch(`http://localhost:5002/news/${id}`)
        .then(r => r.json())
    },
    deleteArticle: (id) => {
      return fetch(`http://localhost:5002/news/${id}`, {
        method: "DELETE"
      })

    },
    addNewArticle(newArticle) {
      return fetch(`http://localhost:5002/news`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newArticle)
      }).then(data => data.json())
    },
    editArticle(editedArticle) {
      return fetch(`http://localhost:5002/news/${editedArticle.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editedArticle)
      }).then(data => data.json());
    }


  }