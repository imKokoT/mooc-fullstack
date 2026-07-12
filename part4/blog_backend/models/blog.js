const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
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

module.exports = mongoose.model('Blog', blogSchema)
