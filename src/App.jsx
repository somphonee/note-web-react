import { useState } from 'react'

import "@picocss/pico"
import "./App.css"
function App() {
  return (
    <main className="container">
    <h1 className="app-title"> My Notes </h1>
    
    <div className="note-list" >
      <article className="note-item">
        <div className="note-title">Note 1</div>
      </article>
      <article className="note-item">
        <div className="note-title" >Note 2</div>
      </article>
    </div>

    <label htmlFor='title'>
      Title
      <input 
        name="title"
        placeholder="title"
        type="text"
        required
      />
    </label>

    <label htmlFor='content'>
        Content      
        <textarea 
        name="content"
        type="text"
        required
      />
    </label>
    <button type="submit">Add Note</button>
  

    </main>
  )
}

export default App
