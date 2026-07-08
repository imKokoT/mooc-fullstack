const mongoose = require('mongoose')
const { Person } = require('./mongo')

const argv = process.argv

function showAll() {
    Person
        .find({})
        .then(people=> {
            console.log('People:')
            people.forEach(p => {
                console.log(` - ${p.name} ${p.number}`)
            });
            mongoose.connection.close()
    })
}

function newPerson() {
    if (argv.length !== 5) {
        console.log('2 additional arguments are required (name, number)')
        process.exit(1)
    }

    const person = new Person({
        name: argv[3],
        number: argv[4]
    })

    person.save().then(result => {
        console.log(`successfully added new person ${person.name} (number: ${person.number}) to phonebook`)
        mongoose.connection.close()
    })
}

// entry
if (argv.length === 3)
    showAll()
else
    newPerson()
