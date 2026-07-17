const mongoose = require('mongoose')

const BlogSchema = mongoose.Schema({
  title: { 
    type: String,
    trim: true,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true,
    trim: true
  },
  likes: {
    type: Number,
    default: 0
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

// grouped unique keys
//
// PS so sad mongoose-mongodb does not allow
// indexes through refs, so author still relevant
BlogSchema.index(
  { author: 1, title: 1 },
  { unique: true }
)

BlogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', BlogSchema)
