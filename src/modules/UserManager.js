export default {

    getAllUsers: () => {
      return fetch("http://localhost:5002/users")
        .then(r => r.json())
    },
    getSingleUser: (id) => {
      return fetch(`http://localhost:5002/users/${id}`)
        .then(r => r.json())
    },
    deleteUser: (id) => {
      return fetch(`http://localhost:5002/users/${id}`, {
        method: "DELETE"
      })
        .then(() => fetch(`http://localhost:5002/users`))
        .then(e => e.json())
    },
    addNewUser(newUser) {
      return fetch(`http://localhost:5002/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      }).then(data => data.json())
    },
    editUser(editedUser) {
      return fetch(`http://localhost:5002/users/${editedUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editedUser)
      }).then(data => data.json());
    }
}
