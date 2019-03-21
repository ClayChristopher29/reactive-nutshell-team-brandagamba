import React, { Component } from "react";
import { Link } from "react-router-dom";


export default class NoteList extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="newButton">
                    <button type="button"
                        className="btn btn-success"
                        onClick={() => {
                            this.props.history.push("/notes/new")
                        }
                        }>
                        New Note
                    </button>
                </div>
                <section className="notes">
                    {
                        this.props.notes.map(note =>
                            <div key={note.id} className="card">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {/* <img src={dog} alt="" className="icon--dog" /> */}
                                        <p className="newNote">{note.note}</p>
                                        <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={() => {
                                        this.props.deleteNote(note.id)
                                        this.props.history.push(`/notes`);
                                    }}
                                >
                                    Delete
</button>


                                    </h5>
                                </div>
                            </div>
                        )
                    }
                </section>
            </React.Fragment>
        )

    }
}