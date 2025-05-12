import { useState } from 'react'

import "@picocss/pico"
import "./App.css"
function App() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notes, setNotes] = useState([]);

  return (
    <main className="container">
    <h1 className="app-title"> My Notes </h1>
    <div className="note-list" >
      {notes.map ((note, index ) => (

       <article key = {index} className="note-item">
        <div className="note-title">{note.title}</div>
        <button className="note-edit-button">🖋️</button>
      </article>

      ))}

    </div>

    <label htmlFor='title'>
      Title
      <input 
        name="title"
        placeholder="title"
        type="text"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </label>

    <label htmlFor='content'>
        Content      
        <textarea 
        name="content"
        type="text"
        required
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </label>
    <button 
    type="submit"
    onClick={(e) => {
      e.preventDefault();
      setNotes([...notes, { title, content }]);
      setTitle('');
      setContent('');
    }}

    >Add Note</button>
  

    </main>
  )
}

export default App
