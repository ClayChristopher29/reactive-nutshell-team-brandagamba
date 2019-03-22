import React, { Component } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import NewModalForm from "./NewModalForm.js"

export default class TaskList extends Component {
  state = {
    showModal: false,
    search: ""
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
    evt.preventDefault();
    const completeObject = {
      complete: true
    };
    this.props.completeTask(completeObject, this.props.match.params.taskId);
  };

  render() {
    //Toggles Modal Visibility in State
    let modalClose = () => this.setState({ showModal: false })
    //Filters tasks based on search bar input
    let filteredTasks = this.props.tasks.filter(task => {
      return task.task.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 || task.dueDate.indexOf(this.state.search) !== -1
    })
    return (
      <div className="tasksHeader">
        <h1>Tasks</h1>
        {/* Toggles Modal on click */}
        <button
          className="btn btn-secondary"
          onClick={this.handleModal}
        >
          Add new task
        </button>
        <input type="text" placeholder="Search" className="search" value={this.state.search} id="search" onChange={this.handleFieldChange}/>
        {filteredTasks.map((task) => {
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
        )}

        )
      }
      {/* Render Modal conditionally depending on its properties in state - Also passes down functions to handle modal visibility for close and submit buttons on modal*/}
        {this.state.showModal ? <NewModalForm
            show={this.state.showModal}
            onHide={modalClose}
            addTask={this.props.addTask}
          /> : ""}

      </div>
    );
  }
}


