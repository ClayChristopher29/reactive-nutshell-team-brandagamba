
const TaskManager = {
    getAllTasks(userId) {
        return fetch(`http://localhost:5002/tasks/?users=${userId}&&complete=false`)
        .then(r => r.json())
    },

    getOneTask(taskId) {
        return fetch(`http://localhost:5002/tasks/${taskId}`)
        .then(r => r.json())
    },

    editTask(taskObject) {
        return fetch(`http://localhost:5002/tasks/${taskObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(taskObject)
        }).then(r => r.json())
    },

    addNewTask(taskObject) {
        return fetch(`http://localhost:5002/tasks`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(taskObject)
        }).then(r => r.json())
    },

    completeTask(completeObject, taskId) {
        return fetch(`http://localhost:5002/tasks/${taskId}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(completeObject)
        })

    }
}

export default TaskManager;

//GetAllTasks only returns task if isCompleted = false - use put request for archive!