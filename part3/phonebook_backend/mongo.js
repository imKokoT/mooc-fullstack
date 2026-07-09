const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to db...')

mongoose.set('strictQuery',false)
mongoose.connect(url, { family: 4 })

// models
const PersonSchema = mongoose.Schema({
    // easier make unique than do custom checks.
    // and i like mongoose orm but i miss static
    // typing hints
    name: {
      type: String,
      unique: true,
      required: true,
      minLength: 3,
      trim: true
    },
    number: {
      type: String,
      unique: true,
      required: true,
      match: [/^[0-9-]+$/, 'Invalid phone number format']
    }
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
