const remoteURL = "http://localhost:5002";

export default {
  getAllEvents(id) {
    return fetch(`${remoteURL}/events/?userId=${id}`).then(e => e.json());
  },
  addEventAndList(newEvent) {
    return fetch(`${remoteURL}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
},
    body: JSON.stringify(newEvent)
    })
},
  deleteEventAndList(id) {
     return fetch(`${remoteURL}/events/${id}`, {
    method: "DELETE"
})
  },
  updateEventAndList(editedEvent) {
      return fetch(`${remoteURL}/events/${editedEvent.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editedEvent)
      });
    },
    getSingleEvent(id) {
      return fetch(`${remoteURL}/events/${id}`).then(r => r.json())
    }
  }




