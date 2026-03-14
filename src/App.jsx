import React, { useState, useEffect } from 'react'

const App = () => {

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes")
    return savedNotes ? JSON.parse(savedNotes) : []
  })

  function stt(e) {
    e.preventDefault()
    setNotes([...notes, { title, content }])
    setTitle("")
    setContent("")
  }

  function deleteNote(i) {
    setNotes(notes.filter((_, index) => index !== i))
  }

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  return (
    <div className="bg-black min-h-screen text-white p-6">
      <div className="flex flex-col lg:flex-row gap-10">

        {/* Form */}
        <form className="flex flex-col gap-4 w-full lg:w-1/2" onSubmit={stt}>
          <input
            type="text"
            className="px-4 py-2 border rounded w-full text-black bg-white"
            placeholder="Enter the heading"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="px-4 py-2 border rounded w-full h-40 text-black bg-white"
            placeholder="Enter the content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button className="bg-white text-black px-4 py-2 rounded font-medium hover:bg-gray-200">
            Submit
          </button>
        </form>

        <div className="w-full lg:w-1/2">
          <h1 className="text-2xl font-bold mb-5">Your Notes</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {notes.map((note, index) => (
              <div
                key={index}
                className="bg-white text-black p-4 rounded-xl shadow h-40 flex flex-col justify-between"
              >
                <div>
                  <h2 className="font-bold text-lg">{note.title}</h2>
                  <p className="text-sm mt-2">{note.content}</p>
                </div>

                <button
                  onClick={() => deleteNote(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded mt-2"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

export default App