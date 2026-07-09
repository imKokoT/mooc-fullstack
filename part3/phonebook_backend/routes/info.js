const app = require('../app')
const { Person } = require('../mongo')

// so i can work with this directly 
// if i define async callback like old example
// but it looks less readable/require more control   
app.get('/info/', /* async */ (req, res) => {
    /*
    try {
        const peopleCount = await Person.countDocuments()
        res.send(`
            Phonebook contains data of ${peopleCount} people<br>
            ${new Date()}
        `)
    } catch (error) {
        res.status(500).end()
        console.error(error)
        return
    }
    */
    Person.countDocuments()
        .then(count => {
            res.send(`
                Phonebook contains data of ${count} people<br>
                ${new Date()}
            `)
        }).catch(error => {
            console.error(error)
            res.status(500).end()
        })
})
