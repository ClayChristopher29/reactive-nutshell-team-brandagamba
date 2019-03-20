export default {

    getAllMessages: () => {
      return fetch(`http://localhost:5002/messages?_expand=user`)
        .then(r => r.json())
    },
    getSingleMessage: (id) => {
      return fetch(`http://localhost:5002/messages/${id}`)
        .then(r => r.json())
    },
    deleteArticle: (id) => {
      return fetch(`http://localhost:5002/messages/${id}`, {
        method: "DELETE"
      })

    },
    addNewMessage(newMessage) {
      return fetch(`http://localhost:5002/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newMessage)
      })
    },
    editMessage(editedMessage) {
      return fetch(`http://localhost:5002/messages/${editedMessage.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editedMessage)
      })
    }


  }