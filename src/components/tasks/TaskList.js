import React, { Component } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import NewModalForm from "./NewModalForm.js"

export default class TaskList extends Component {
  //pass down a patch function from application views that handles change event on checkboxes!
  state = {
    showModal: false,
  }

  handleModal = evt => {
    evt.preventDefault()
    this.setState({
      showModal: true
    })
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
}


  handleCheckbox = evt => {
    // const stateToChange = {}
    // stateToChange[evt.target.id] = evt.target.value
    // this.setState(stateToChange)
    evt.preventDefault();
    const completeObject = {
      complete: true
    };
    this.props.completeTask(completeObject, this.props.match.params.taskId);
  };

  render() {
    let modalClose = () => this.setState({ showModal: false })

    return (
      <div>
        <h1>Tasks</h1>
        <button
          className="btn btn-secondary"
          onClick={this.handleModal}
        >
          Add new task
        </button>
        {this.props.tasks.map(task => {
          return (
            <div className="card" style={{width: "18rem"}}>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <div key={task.id}>
                <input
                  type="checkbox"
                  onChange={() =>
                    this.props.completeTask({ complete: true }, task.id)
                  }
                />
                <Link to={`/tasks/${task.id}/edit`} className="link">
                  {task.task}
                </Link>
                <p>
                  Due Date:<Moment format="MM/DD/YYYY">{task.dueDate}</Moment>
                </p>
              </div>
            </li>

            </ul>
          </div>
          );
        })}
        {this.state.showModal ? <NewModalForm
            show={this.state.showModal}
            onHide={modalClose}
            addTask={this.props.addTask}
          /> : ""}

      </div>
    );
  }
}


