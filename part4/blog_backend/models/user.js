const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    trim: true
  },
  password: {
    type: String
  },
  
  created: String,
  last_login: String,

  is_admin: {
    type: Boolean,
    default: false
  }
})

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('User', UserSchema)
