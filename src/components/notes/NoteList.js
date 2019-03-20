import React, { Component } from "react";
import { Link } from "react-router-dom";


export default class NoteList extends Component {
    render() {
        return <section className="notes">
            {
                this.props.notes.map(note =>

                    <div key={note.id} className="card">
                        <div className="card-body">
                            <h5 className="card-title">
                                {/* <img src={userAvatar} alt="" className="icon--user" /> */}
                                <p className="note">{note.note}</p>

                            </h5>
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
                            <button type="button"
                                className="btn btn-success"
                                onClick={() => {
                                    this.props.history.push("/animals/new")
                                }
                                }>
                                Add Note
                    </button>
                        </div>
                    </div>
        )
    }

        </section>

    }
}