const remoteURL = "http://localhost:5002";

export default {
  getAllEvents() {
    return fetch(`${remoteURL}/events`).then(e => e.json());
  },
  addEventAndList(newEvent) {
    return fetch(`${remoteURL}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
},
    body: JSON.stringify(newEvent)
    }).then(this.getAllEvents)
},
  deleteEventAndList(id) {
     return fetch(`${remoteURL}/events/${id}`, {
    method: "DELETE"
}).then(this.getAllEvents)
  },
  updateEventAndList(editedEvent) {
      return fetch(`${remoteURL}/events/${editedEvent.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editedEvent)
      }).then(this.getAllEvents);
    },
    getSingleEvent(id) {
      return fetch(`${remoteURL}/events/${id}`).then(r => r.json())
    }
  }




