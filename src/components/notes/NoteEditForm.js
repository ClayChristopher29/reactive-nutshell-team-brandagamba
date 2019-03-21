import React, { Component } from "react";
// import "./note.css"
import NoteManager from '../../modules/NoteManager'


export default class NoteEditForm extends Component {
  // Set initial state
  state = {
    name: "",
    userId: parseInt(sessionStorage.getItem("activeUser"))
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  updateCurrentNote = evt => {
    evt.preventDefault();
      const note = {
        id: this.props.match.params.noteId,
        name: this.state.name,
        userId: this.state.userId
      };

      // Create the event and redirect user to event list
      this.props.updateNote(note)
        this.props.history.push("/notes")
  };
  componentDidMount() {
    NoteManager.getSingleNote(this.props.match.params.noteId)
    .then(note => {
      this.setState({
        name: note.name,

      });
    });
  }



    render() {
        return(
            <form>
    <div className="form-group">
    <label htmlFor="formNoteInput">Edit Note</label>
    <input type="text" className="form-control" id="name" value={this.state.name} onChange={this.handleFieldChange} />
    </div>

    <button type="button" className="btn btn-success"
    onClick={this.updateCurrentNote}>Submit</button>
    </form>
        )
    }
}
