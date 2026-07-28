const router = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const requireLogin = require('../utils/middleware/requireLogin')
const mongoose = require('mongoose')


router.get('/', async (req, res) => {
  const blogs = await Blog.find({})
    .populate('owner', {
      username: 1,
      created: 1,
      last_login: 1
    })
  res.json(blogs)
})

router.post('/', requireLogin, async (req, res) => {
  const blog = new Blog({
    ...req.body,
    owner: req.user.id
  })
  
  blog.author = req.user.username
  req.user.blogs.push(blog.id)

  /*
    i thought SQLAlchemy's transactions are aquard,
    but mongoose totally outplayed it...
  */
  /*const session = await mongoose.startSession()
  try {
    await session.withTransaction(async () => {
      await blog.save(session)
      await req.user.save(session)
    })
  }
  finally {
    await session.endSession()
  }*/

  /* 
    after some research of mongoose docs i found actually what i need 
  
    NOTE mongoose.set('transactionAsyncLocalStorage', true) is required
  */
  await mongoose.connection.transaction(async () =>{
    await blog.save()
    await req.user.save()
  })
  
  logger.info('ADDED Blog ID', blog.id)
  res.status(201).json(blog)
})

router.get('/:id', async (req, res) => {
  const id = req.params.id

  const blog = await Blog.findById(id)
    .populate('owner', {
      username: 1,
      created: 1,
      last_login: 1
    })
  if (!blog)
    return res.status(404).end()

  res.json(blog)
})

router.delete('/:id', requireLogin, async (req, res) => {
  const id = req.params.id
  
  if (!req.user.blogs.includes(id) && !req.user.is_admin)
    return res.sendStatus(403)
  
  const blog = await Blog.findById(id)
  if (!blog)
    return res.status(404).end()

  // lets ignore concurrency for this small app because
  // error handling in transactions is aquard :P
  await mongoose.connection.transaction(async () => {
    await blog.deleteOne()

    req.user.blogs = req.user.blogs.filter(
      blogId => blogId.toString() !== id
    )
    await req.user.save()
  })

  logger.info('DELETE Blog ID', id)
  res.status(204).end()
})

router.put('/:id', requireLogin, async (req, res) => {
  const id = req.params.id
  const newBlog = req.body
  
  if (!req.user.blogs.includes(id) && !req.user.is_admin)
    return res.sendStatus(403)

  const blog = await Blog.findById(id)
  if (!blog)
    return res.status(404).end()

  blog.title = newBlog.title
  blog.url = newBlog.url
  blog.likes = newBlog.likes ? newBlog.likes : blog.likes

  await blog.save()
  logger.info('UPDATED Blog ID', id)
  res.status(200).json(blog)
})

// TODO: record who liked
router.put('/:id/like', requireLogin, async (req, res) => {
  const id = req.params.id

  const blog = await Blog.findById(id)
  if (!blog)
    return res.status(404).end()

  blog.likes++

  await blog.save()
  res.status(200).json(blog)
})

module.exports = router
