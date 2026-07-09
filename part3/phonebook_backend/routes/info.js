const app = require('../app')
const { Person } = require('../mongo')


app.get('/info/', async (request, response) => {
    try {
        const peopleCount = await Person.countDocuments()
        response.send(`
            Phonebook contains data of ${peopleCount} people<br>
            ${new Date()}
        `)
    } catch (error) {
        response.status(500).end()
        console.error(error)
        return
    }
})
