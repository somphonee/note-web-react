import { useState } from 'react'

import "@picocss/pico"
import "./App.css"
function App() {

  const [noteData, setNoteData] = useState({title:'', content:''})
  const [notes, setNotes] = useState([]);

  return (
    <main className="container">
    <h1 className="app-title"> My Notes </h1>
    <div className="note-list" >
      {notes.map ((note, index ) => (
       <article key = {index} className="note-item">
        <div className="note-title">{note.title}</div>
        <button className="note-edit-button" 
        onClick={() => {
          setNoteData(note)
        }}
        >🖋️</button>
      </article>

      ))}

    </div>

    <label htmlFor='title'>
      Title
      <input 
        placeholder="title"
        type="text"
        required
        value={noteData.title}
        onChange={(e) => setNoteData({ ...noteData, title: e.target.value}) } 
      />
    </label>

    <label htmlFor='content'>
        Content      
        <textarea 
        type="text"
        required
        value={noteData.content}
        onChange={(e) =>  setNoteData({ ...noteData, content: e.target.value})}
      />
    </label>
    <button 
    type="submit"
    onClick={(e) => {
      if (noteData.id){
        setNotes(
          notes.map((note) => {
            if(note.id === noteData.id){
              return noteData;
            }
            return note
          })
        )

      }else{
      setNotes([...notes, { ...noteData, id: Date.now()}]);
      }
      setNoteData({title:"", content:""})
    }}

    >Add Note</button>
  

    </main>
  )
}

export default App
