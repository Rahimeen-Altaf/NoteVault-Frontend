import { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial)

  // Add all note
  const getNotes = async () => {
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwZjEwNjA1YmY2MDQzN2RjNTEzZjhmIn0sImlhdCI6MTY5NTk3Nzg0NX0.xbyVbNxnfOngjRCjtww2AugXUAR9pJhQjN5xRcrcLl0"
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  }

  // Add a note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwZjEwNjA1YmY2MDQzN2RjNTEzZjhmIn0sImlhdCI6MTY5NTk3Nzg0NX0.xbyVbNxnfOngjRCjtww2AugXUAR9pJhQjN5xRcrcLl0"
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  }

  // Delete a note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwZjEwNjA1YmY2MDQzN2RjNTEzZjhmIn0sImlhdCI6MTY5NTk3Nzg0NX0.xbyVbNxnfOngjRCjtww2AugXUAR9pJhQjN5xRcrcLl0"
      },
    });
    const json = await response.json();
    console.log(json);

    console.log('deleting the note with id: ' + id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes);
  }

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwZjEwNjA1YmY2MDQzN2RjNTEzZjhmIn0sImlhdCI6MTY5NTk3Nzg0NX0.xbyVbNxnfOngjRCjtww2AugXUAR9pJhQjN5xRcrcLl0"
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    console.log(json)


    let newNotes = JSON.parse(JSON.stringify(notes))
    
    // Logic to edit in clientg
    for (let index = 0; index < newNotes.length; index++) {
      const note = newNotes[index];
      if (note._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;