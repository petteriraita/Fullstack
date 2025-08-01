const express = require('express')
const app = express()
app.use(express.json())


let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the PETTERI important methods of HTTP protocol",
    important: true
  }
]
// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/json' })
//   response.end(JSON.stringify(notes))
// })

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)
  if (note) {
    response.json(notes)
  } else {
    response.status(401).end()
  }
})

// the ... turns the array into individual numbers
const generateId = () => {
  const maxId = notes.lenght > 0
  ? Math.max(...notes.map(n => Number(n.id)))
  : 0
  return String(maxId + 1)

}
app.post('/api/notes', (request, response) => {
  const body = request.body
  

  if (!body.content) {
    return response.status(400).json({
      error: 'content is missing !'
    })
  }
  const note = {
    id: generateId(),
    content: body.content,
    important: body.important || false
  }


  notes.concat(note)
  console.log('posted note: ', note);
  response.json(note)
})
app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)