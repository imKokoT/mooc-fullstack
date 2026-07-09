const app = require('../app.js')
const { Person } = require('../mongo.js')

const routeUrl = '/api/persons'


app.get(routeUrl, (request, response) => {
    Person.find({}).then(persons =>
        response.json(persons)
    )
})

app.get(`${routeUrl}/:id`, (request, response) => {
    const id = request.params.id

    Person.findById(id)
        .then(person => {
            if (person)
                response.json(person)
            else
                response.status(404).end()
        }).catch(error => {
            response.status(400).send('bad id')
        })
})

app.delete(`${routeUrl}/:id`, (request, response) =>{
    const id = request.params.id
    
    Person.findByIdAndDelete(id)
        .then(person => {
            if (!person)
                return response.status(404).end()

            console.log('DELETE PERSON ID', id)
            response.status(204).end()
        }).catch(error => {
            response.status(400).send('bad id')
        })
})

app.post(routeUrl, (request, response) => {
    const person = request.body

    if (!person)
        return response.status(400).end()

    if (!person.name || !person.number)
        return response.status(422).end()
    
    const newPerson = new Person({
        name: person.name,
        number: person.number
    })
    
    newPerson.save().then(result => {
        console.log('ADDED PERSON', newPerson.id)
        response.status(201).json(newPerson)
    }).catch(error => {
        if (error.code === 11000) 
            return response.status(409).send('duplicate values was detected')
        
        console.error(error)
        response.status(500).end()
    })
})
