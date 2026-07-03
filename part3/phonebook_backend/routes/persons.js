const { request } = require('../app.js')
const { response } = require('../app.js')
const app = require('../app.js')
const { persons } = require('../data.js')

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if (person)
        response.json(person)
    else
        response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) =>{
    const id = request.params.id
    const person = persons.findIndex(person => person.id === id)

    if (person === -1) 
        return response.status(404)

    persons.splice(person, 1)
    response.status(204).end()
    console.log('DELETE PERSON ID', id)
})
