const router = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const mongoose = require('mongoose')


router.post('/reset', async (req, res) => {
  // clear
  await Blog.deleteMany({})
  await User.deleteMany({})

  // add some data
  const otherUser = new User({username: 'other'})
  const anotherBlog = new Blog({
    title: 'another',
    url: 'https://example.com',
    owner: otherUser.id
  })
  otherUser.blogs.push(anotherBlog.id)

  await mongoose.connection.transaction(async () =>{
    await anotherBlog.save()
    await otherUser.save()
  })

  logger.info('reset testing database')
  res.sendStatus(204)
})

module.exports = router
