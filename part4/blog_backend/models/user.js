const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    trim: true,
    unique: true
  },
  password: {
    type: String
  },

  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],

  // TODO: list of liked blogs by a user to prevent boosting
  
  created: {
    type: Date,
    default: Date.now
  },
  last_login: {
    type: Date,
    default: Date.now
  },

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
