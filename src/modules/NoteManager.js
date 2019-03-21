export default {

    getSingleNote: (id) => {
        return fetch(`http://localhost:5002/notes/${id}`)
            .then(r => r.json())
    },

    getAllNotes: (id) => {
        return fetch(`http://localhost:5002/notes?userId=${id}`)
            .then(r => r.json())
    },

    postNote(newNote) {
        return fetch("http://localhost:5002/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newNote)
        }).then(data => data.json())
    },
    deleteNote: id => {
        return fetch(`http://localhost:5002/notes/${id}`, {
            method: "DELETE"
        }).then(friends => friends.json)
    },
    updateNote(editedNote) {
        return fetch(`http://localhost:5002/notes/${editedNote.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(editedNote)
        });
      },
    // getNoteByUser: id => {
    //     return fetch(`http://localhost:5002/notes?_expand=user&userId=1`)
    //     .then(r => r.json)
    // }
}