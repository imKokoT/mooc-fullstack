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

    if (!newPerson)
        return res.status(400).end()

    if (!newPerson.name || !newPerson.number)
        return res.status(422).end()
    
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

app.post(routeUrl, (req, res) => {
    const person = req.body

    if (!person)
        return res.status(400).end()

    if (!person.name || !person.number)
        return res.status(422).end()
    
    const newPerson = new Person({
        name: person.name,
        number: person.number
    })
    
    newPerson.save().then(result => {
        console.log('ADDED PERSON', newPerson.id)
        res.status(201).json(newPerson)
    }).catch(error => {
        if (error.code === 11000) 
            return res.status(409).send('duplicate values was detected')
        
        console.error(error)
        res.status(500).end()
    })
})
