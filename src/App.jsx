import { useState, useEffect, use, useRef, useCallback } from 'react'

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


 function useDefounceFn(fn, delay = 1000){
  const timeout = useRef(null)
  return( ...args) => {
     clearTimeout(timeout.current);
   timeout.current =   setTimeout(() => {
      fn(...args)
    }, delay);
  }

 } 

 function useDefounceValue(value, delay = 1000) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function App() {
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);

  const [noteData, setNoteData] = useState(null)
  const [deletetingItem, setDeletetingItem] = useState(null);
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes")
    return JSON.parse(savedNotes) ?? [];}
  );

  const saveNote = useCallback(
    (newData) => {
    const isExisted = notes.find(note => note.id === newData.id);
    if(isExisted){
      setNotes(
        notes.map((note) => {
          if (note.id === newData.id) {
            return noteData;
          }
          return note
        })
      );
    }else{

      setNotes([...notes, newData]);
    }

  },[notes]);
  const debouncedNotes = useDefounceValue(notes, 1000);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(debouncedNotes))

  }, [debouncedNotes])


  useEffect(() => {
    const handleKeydown = (event) => {
      if((event.ctrlKey || event.metaKey) && event.key === "z"){
        event.preventDefault();
        if(event.shiftKey){
          //redo
          const lastNote = future[0];
              if (lastNote) {
                setHistory([noteData, ...history]);
                setNoteData(lastNote);
                saveNote(lastNote);
                setFuture(future.slice(1));
              }

        }else{
          // undo
           const previous = history[0];
              if (previous) {
                setNoteData(previous);
                setHistory(history.slice(1));
                saveNote(previous);
                setFuture([noteData, ...future]);
              }
        }

      }

    };
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
    },[future,history, noteData,saveNote]);



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
                  saveNote(newData);
                  setNoteData(newData);
                  setHistory([noteData, ...history]);

              } else {
                const newId = Date.now();
                const newData = {
                  ...noteData,
                    id: newId,
                  [field] : value,

                };                
                saveNote(newData)
                setNoteData(newData);
                setHistory([noteData, ...history]);
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
          <div style={{ display: "flex", gap: 16 }}>
            <button style={{width: "auto"}} 
            disabled = {!history.length}
            onClick={() => {
              const previous = history[0];
              if (previous) {
                setHistory(history.slice(1));
                setNoteData(previous);
                saveNote(previous);
                setFuture([noteData, ...future]);
              }
            }}>Undo</button>
            <button style={{width: "auto"}}
            disabled = {!future.length}
            onClick={() => {
              const lastNote = future[0];
              if (lastNote) {
                setHistory([noteData, ...history]);
                setNoteData(lastNote);
                saveNote(lastNote);
                setFuture(future.slice(1));
                
              }
            }}
            >Redo</button>
          </div>
        </>
      )}


    </main>
  );
}


export default App
