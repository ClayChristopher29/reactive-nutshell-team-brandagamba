export default {

    getSingleNote: (id) => {
        return fetch(`http://localhost:5002/notes/${id}`)
            .then(r => r.json())
    },

    getAllNotes: () => {
        return fetch(`http://localhost:5002/notes?_expand=user&userId=1`)
            .then(r => r.json())
    },

    postNote(newFriend) {
        return fetch("http://localhost:5002/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newFriend)
        }).then(data => data.json())
    },
    deleteNote: id => {
        return fetch(`http://localhost:5002/notes/${id}`, {
            method: "DELETE"
        }).then(friends => friends.json)
    },

    // getNoteByUser: id => {
    //     return fetch(`http://localhost:5002/notes?_expand=user&userId=1`)
    //     .then(r => r.json)
    // }
}