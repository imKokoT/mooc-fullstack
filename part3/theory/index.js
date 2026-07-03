/*
if exists a joke about every new option to generate 
electricity, where the main principe is boiling water,
every new backend on every new language/framework will 
use same structure of routes :P
*/

const express = require('express')
const app = express()
app.use(express.json()) // important stuff to allow api to parse json bodies

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
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1><a href="/api/notes">view notes</a>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})


// with :name wi define route parameters
app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)

  if (note) {
      response.json(note)
  } else {
      response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  console.log('deleted note', id)
  response.status(204).end() // 204 == success
})


app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
