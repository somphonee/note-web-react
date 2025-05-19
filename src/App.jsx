import { useState, useEffect, use } from 'react'

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

  const [noteData, setNoteData] = useState(null)
  const [deletetingItem, setDeletetingItem] = useState(null);
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes")
    return JSON.parse(savedNotes) ?? [];
  }
  );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))

  }, [notes])


  function handleStorageChange(event) {
    console.log("Storage changed", event);
    const newNotes = JSON.parse(event.newValue);
    setNotes(newNotes);
  }


  useEffect(() => {
    window.addEventListener("storage", handleStorageChange)
    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }

  }, [])
  const updateField = (field, value) => {
        if (noteData.id) {
                  const newData = {
                  ...noteData,
                  [field]:  value,

                }
                setNotes(
                  notes.map((note) => {
                    if (note.id === newData.id) {
                      return noteData;
                    }
                    return note
                  })
                );
                  setNoteData(newData);


              } else {
                const newId = Date.now();
                const newData = {
                  ...noteData,
                    id: newId,
                  [field] : value,

                };
                setNotes([...notes, newData]);
                setNoteData(newData);
              }

            }


  return (
    <main className="container">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 className="app-title"> My Notes </h1>
        <button style={{ width: "auto" }} onClick={() => {
          setNoteData({ title: "", content: "" })
        }}

        >➕</button>
      </div>
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
      {noteData && (
        <>
          <label htmlFor='title'>
            Title
            <input
              placeholder="title"
              type="text"
              required
              value={noteData.title}
              onChange={(e) => {
                updateField('title', e.target.value);

              }}
            />
          </label>

          <label htmlFor='content'>
            Content
            <textarea
              type="text"
              required
              value={noteData.content}
               onChange={(e) => {
                updateField('content', e.target.value);
              }}

            />
          </label>
        </>
      )}


    </main>
  );
}


export default App
