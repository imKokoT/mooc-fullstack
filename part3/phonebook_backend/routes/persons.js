const app = require('../app.js')
const { Person } = require('../mongo.js')

const routeUrl = '/api/persons'


app.get(routeUrl, (req, res) => {
    Person.find({}).then(persons =>
        res.json(persons)
    )
})

app.get(`${routeUrl}/:id`, (req, res, next) => {
    const id = req.params.id

    Person.findById(id)
        .then(person => {
            if (person)
                res.json(person)
            else
                res.status(404).end()
        }).catch(error => 
            next(error)
        )
})

app.delete(`${routeUrl}/:id`, (req, res, next) => {
    const id = req.params.id
    
    Person.findByIdAndDelete(id)
        .then(person => {
            if (!person)
                return res.status(404).end()

            console.log('DELETE PERSON ID', id)
            res.status(204).end()
        }).catch(error =>
            next(error)
        )
})

app.put(`${routeUrl}/:id`, (req, res, next) => {
    const id = req.params.id
    const newPerson = req.body
    
    Person.findById(id)
        .then(person => {
            if (!person)
                return res.status(404).end()

            person.name = newPerson.name
            person.number = newPerson.number
            person.save()

            res.status(200).json(person)
            console.log('UPDATED PERSON', person.id)
        }).catch(error =>
            next(error)
        )
})

app.post(routeUrl, (req, res, next) => {
    const person = req.body
    
    const newPerson = new Person({
        name: person.name,
        number: person.number
    })
    
    newPerson.save().then(() => {
        console.log('ADDED PERSON', newPerson.id)
        res.status(201).json(newPerson)
    }).catch(error => {
        next(error)
    })
})
