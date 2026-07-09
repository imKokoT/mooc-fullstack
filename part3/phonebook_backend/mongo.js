const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

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
