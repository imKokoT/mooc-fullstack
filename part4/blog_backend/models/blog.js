const mongoose = require('mongoose')

const BlogSchema = mongoose.Schema({
  title: { 
    type: String,
    trim: true,
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

/*
i got an idea to just index owner ref and title.
if this would work it will be cool

year this works, ref is barely id so indexation works
*/
BlogSchema.index(
  { owner: 1, title: 1 },
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
