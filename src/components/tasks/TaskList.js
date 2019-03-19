import React, {Component} from "react"
import {Link} from "react-router-dom"

export default class TaskList extends Component {

    //pass down a patch function from application views that handles change event on checkboxes!
    handleCheckbox = evt => {
        // const stateToChange = {}
        // stateToChange[evt.target.id] = evt.target.value
        // this.setState(stateToChange)
        evt.preventDefault()
        const completeObject = {
            complete: true
        }
        this.props.completeTask(completeObject, this.props.match.params.taskId)
    }


    render() {

        return (
            <div>
            <h1>Tasks</h1>
            <button onClick={() => this.props.history.push("/tasks/new")}>Add new task</button>
            {this.props.tasks.map((task => {
                return <div key={task.id}>
                    <input type="checkbox" onChange={() => this.props.completeTask({complete: true}, task.id)}/>
                    <Link to={`/tasks/${task.id}/edit`} className="link">{task.task}</Link><p>{task.dueDate}</p>
                    </div>
            }))
        }
            </div>
        )
    }


}


//Renders Task List jsx from state - name of task onclick (set to inline?) pushes to /#/edit
//Button for new task - pushes to /tasks/new
//no delete button