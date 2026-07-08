const app = require('../app.js')
const { persons } = require('../data.js')
const { Person } = require('../mongo.js')

const routeUrl = '/api/persons'

app.get(routeUrl, (request, response) => {
    Person.find({}).then(persons =>
        response.json(persons)
    )
})

app.get(`${routeUrl}/:id`, (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if (person)
        response.json(person)
    else
        response.status(404).end()
})

app.delete(`${routeUrl}/:id`, (request, response) =>{
    const id = request.params.id
    const person = persons.findIndex(person => person.id === id)

    if (person === -1) 
        return response.status(404)

    const removed = persons.splice(person, 1)[0]
    response.status(204).end() // lol, 204 does not have body, only 200 could, so lets update frontend
    console.log('DELETE PERSON ID', id)
})

app.post(routeUrl, (request, response) => {
    const person = request.body

    if (!person)
        return response.status(400).end()

    if (!person.name || !person.number)
        return response.status(422).end()

    if (persons.find(p => person.name === p.name))
        return response.status(422).send('already exists')

    const newPerson = {
        id: (Math.random() * 10**16).toFixed(0),
        ...person
    }

    persons.push(newPerson)
    console.log('ADDED PERSON', newPerson)
    response.status(201).json(newPerson)
})
