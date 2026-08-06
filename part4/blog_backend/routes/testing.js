const router = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const mongoose = require('mongoose')


async function addBlog(title, username) {
  let user = await User.findOne({username:username})
  if (!user)
    user = new User({username: username})

  const blog = new Blog({
    title: title,
    url: 'https://example.com',
    owner: user.id
  })
  user.blogs.push(blog.id)

  await mongoose.connection.transaction(async () =>{
    await blog.save()
    await user.save()
  })
}

router.post('/reset', async (req, res) => {
  // clear
  await Blog.deleteMany({})
  await User.deleteMany({})

  // add some data
  await addBlog('another', 'other')

  logger.info('reset testing database')
  res.sendStatus(200)
})

router.post('/reset-list', async (req, res) => {
  await Blog.deleteMany({
    title: {
      $in: req.body
    }})

  logger.info('deleted list of blogs:', req.body)
  res.sendStatus(204)
})

router.post('/add-blog', async (req, res) => {
  await addBlog(req.body.title, req.body.username)
  res.sendStatus(201)
})

module.exports = router
