const app = require('../app.js')
const { persons } = require('../data.js')

app.get('/info/', (request, response) => {
    response.send(`
        Phonebook contains data of ${persons.length} persons<br>
        ${new Date()}
    `)
})
