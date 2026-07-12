const mongoose = require('mongoose')

const BlogSchema = mongoose.Schema({
  title: { 
    type: String,
    trim: true,
    required: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  url: {
    type: String,
    required: true,
    trim: true
  },
  likes: {
    type: Number,
    default: 0
  }
})

BlogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', BlogSchema)
