const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://kokot:${password}@mooc-learning-cluster.zun3kpz.mongodb.net/phonebook?appName=mooc-learning-cluster`

console.log('connecting to db...')

mongoose.set('strictQuery',false)
mongoose.connect(url, { family: 4 })

// models
const PersonSchema = mongoose.Schema({
    name: String,
    number: String
})
PersonSchema.set('toJSON', { // reformat ORM model's schema
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
const Person = mongoose.model('Person', PersonSchema)

module.exports = {
    Person
}
