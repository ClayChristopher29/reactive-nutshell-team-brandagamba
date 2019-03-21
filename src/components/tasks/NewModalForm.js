import React, {Component} from "react"
import {Modal} from "react-bootstrap"
import {Button} from "react-bootstrap"



export default class NewModalForm extends Component {

  state = {
    newTask: "",
    newDueDate: "",
    newComplete: false,
    userId: parseInt(sessionStorage.getItem("activeUser"))
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
}

//     addNewTask = evt => {
//       evt.preventDefault();
//       // const task = {
//       //     task: this.state.newTask,
//       //     dueDate: this.state.newDueDate,
//       //     complete: this.state.newComplete,
//       //     userId: this.state.userId
//       // }
//       this.props.addTask(task)

// }

    submitModal = evt => {
      evt.preventDefault()
      const task = {
        task: this.state.newTask,
        dueDate: this.state.newDueDate,
        complete: this.state.newComplete,
        userId: this.state.userId
    }
      this.props.addTask(task)
      this.props.onHide()
  }



    render() {
      return (
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Enter a New Task
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form>
          <div className="form-group">
            <label htmlFor="taskName">Task Name</label>
            <input
              type="text"
              className="form-control"
              id="newTask"
              aria-describedby="emailHelp"
              onChange={this.handleFieldChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Due Date</label>
            <input
              type="date"
              className="form-control"
              id="newDueDate"
              onChange={this.handleFieldChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.submitModal}

          >
            Submit
          </button>
        </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }
  }

  // class App extends React.Component {
  //   constructor(...args) {
  //     super(...args);

  //     this.state = { modalShow: false };
  //   }

  //   render() {
  //     let modalClose = () => this.setState({ modalShow: false });

  //     return (
  //       <ButtonToolbar>
  //         <Button
  //           variant="primary"
  //           onClick={() => this.setState({ modalShow: true })}
  //         >
  //           Launch vertically centered modal
  //         </Button>

  //         <MyVerticallyCenteredModal
  //           show={this.state.modalShow}
  //           onHide={modalClose}
  //         />
  //       </ButtonToolbar>
  //     );
  //   }
  // }

  // render(<App />);