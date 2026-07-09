const app = require('../app')
const { Person } = require('../mongo')

// so i can work with this directly 
// if i define async callback like old example
// but it looks less readable/require more control   
app.get('/info/', /* async */ (request, response) => {
    /*
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
    */
    Person.countDocuments()
        .then(count => {
            response.send(`
                Phonebook contains data of ${count} people<br>
                ${new Date()}
            `)
        }).catch(error => {
            console.error(error)
            response.status(500).end()
        })
})
