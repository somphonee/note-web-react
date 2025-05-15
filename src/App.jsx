import { useState } from 'react'

import "@picocss/pico"
import "./App.css"


function NoteWidget({ note, editing, onEditNote, onDeleteNote }) {
  return (
    <article key={note.id}
      className={`note-item ${note.id === editing ? "note-editing" : ""}`}>
      <div className="note-title">{note.title}</div>
      <button className="note-edit-button"
        onClick={() => {
          onEditNote?.()
        }}
      >🖋️</button>
      <butto
        className="note-delete-button"
        onClick={() => {
          onDeleteNote?.()
        }}
      >🗑️</butto>
    </article>

  )
}
function App() {

  const [noteData, setNoteData] = useState({ title: '', content: '' })
  const [notes, setNotes] = useState([]);
  const [deletetingItem, setDeletetingItem] = useState(null);

  return (
    <main className="container">
      <h1 className="app-title"> My Notes </h1>
      <div className="note-list" >
        {notes.map((note) => {

          return (
            <NoteWidget
              note={note}
              editing={note.id === noteData.id}
              onEditNote={() => {
                setNoteData(note)
              }}
              onDeleteNote={() => {
                setDeletetingItem(note)
              }}

            />

          )
        })}
        {deletetingItem && (
          <div className="modal">
            <div className="modal-content">

              <div className="modal-tital">Are you sure you want to delete this note?</div>

              <p>
                To delete {deletetingItem.title} note, clike yes button </p>

              <div className="modal-actions">
                <button onClick={() => {
                  setNotes(notes.filter((n) => n.id !== deletetingItem.id))
                  setDeletetingItem(null)
                }}>Yes</button>
                <button onClick={() => setDeletetingItem(null)}>No</button>
              </div>
            </div>
          </div>

        )}

      </div>

      <br />

      <label htmlFor='title'>
        Title
        <input
          placeholder="title"
          type="text"
          required
          value={noteData.title}
          onChange={(e) => setNoteData({ ...noteData, title: e.target.value })}
        />
      </label>

      <label htmlFor='content'>
        Content
        <textarea
          type="text"
          required
          value={noteData.content}
          onChange={(e) => setNoteData({ ...noteData, content: e.target.value })}
        />
      </label>
      <button
        type="submit"
        onClick={(e) => {
          if (noteData.id) {
            setNotes(
              notes.map((note) => {
                if (note.id === noteData.id) {
                  return noteData;
                }
                return note
              })
            )

          } else {
            setNotes([...notes, { ...noteData, id: Date.now() }]);
          }
          setNoteData({ title: "", content: "" })
        }}

      >Add Note</button>


    </main>
  )
}

export default App
