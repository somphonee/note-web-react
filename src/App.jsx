import { useState } from 'react'

import "@picocss/pico"
import "./App.css"
function App() {
  return (
    <main className="container">
    <h1 className="app-title"> My Notes </h1>
    <div style={{display: "flex", gap: "1rem"}} >
      <article style={{margin: 0}}>
        <div>Note 1</div>
      </article>
      <article style={{margin: 0}}>
        <div>Note 2</div>
      </article>
    </div>

    <div  style={{marginTop: "1rem"}}>
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
  
    </div>

    </main>
  )
}

export default App
