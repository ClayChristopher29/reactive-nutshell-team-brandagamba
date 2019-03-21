import React, { Component } from "react";


export default class TaskForm extends Component {
    state = {
        task: "",
        dueDate: "",
        complete: false,
        userId: parseInt(sessionStorage.getItem("activeUser"))
        }

        handleFieldChange = evt => {
            const stateToChange = {}
            stateToChange[evt.target.id] = evt.target.value
            this.setState(stateToChange)
        }

        addNewTask = evt => {
            evt.preventDefault();
            const task = {
                task: this.state.task,
                dueDate: this.state.dueDate,
                complete: this.state.complete,
                userId: this.state.userId
            }
            this.props.addTask(task)
            .then(() => this.props.history.push("/tasks"))

        }


  render() {

    return (
      <div>
        <form>
          <div className="form-group">
            <label htmlFor="taskName">Task Name</label>
            <input
              type="text"
              className="form-control"
              id="task"
              aria-describedby="emailHelp"
              onChange={this.handleFieldChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Due Date</label>
            <input
              type="date"
              className="form-control"
              id="dueDate"
              onChange={this.handleFieldChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.addNewTask}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}
