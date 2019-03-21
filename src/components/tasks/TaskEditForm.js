import React, {Component} from "react"
import TaskManager from "../../modules/TaskManager";
// import TaskManager from "../modules/TaskManager"


export default class TaskEditForm extends Component {
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


    };

    updateTask = evt => {
        if (evt.key === "Enter") {
            evt.preventDefault();
            const editedTask = {
                id: this.props.match.params.taskId,
                task: this.state.task,
                dueDate: this.state.dueDate,
                complete: this.state.complete,
                userId: this.state.userId
            }
            this.props.updateTask(editedTask)
            this.props.history.push("/tasks")
    }};

    // const date = new Date(this.state.dueDate)
    //         const task = {
    //             task: this.state.task,
    //             dueDate: date.toLocaleDateString(),
    //             complete: this.state.complete
    //         }

    componentDidMount(){
        TaskManager.getOneTask(this.props.match.params.taskId)

        .then(task => this.setState({
            task: task.task,
            dueDate: task.dueDate,
            complete: task.complete
        }))
    };

render() {
    return(
        <React.Fragment>
        <form>
        <div className="form-group">
            <label htmlFor="taskName">Task Name</label>
            <input type="text" className="form-control" id="task" aria-describedby="emailHelp" value={this.state.task} onChange={this.handleFieldChange} onKeyPress={this.updateTask}/>
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputPassword1">Due Date</label>
            <input type="date" className="form-control" id="dueDate" value={this.state.dueDate} onChange={this.handleFieldChange} onKeyPress={this.updateTask}/>
        </div>
        </form>
        </React.Fragment>

     )

}








}