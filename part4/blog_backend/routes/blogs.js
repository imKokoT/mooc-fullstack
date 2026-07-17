const router = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const { getTokenFrom } = require('../utils/misc')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

router.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

router.post('/', async (req, res) => {
  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
  
  const user = await User.findById(decodedToken.id)
  if (!user)
    return res.status(400).json({ error: 'UserId missing or not valid' })

  const blog = new Blog(req.body)
  blog.author = user.username

  const result = await blog.save()
  logger.info('ADDED Blog ID', result.id)
  res.status(201).json(result)
})

router.get('/:id', async (req, res) => {
  const id = req.params.id

  const blog = await Blog.findById(id)
  if (!blog)
    return res.status(404).end()

  res.json(blog)
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id

  const blog = await Blog.findByIdAndDelete(id)
  if (!blog)
    return res.status(404).end()

  logger.info('DELETE Blog ID', id)
  res.status(204).end()
})

router.put('/:id', async (req, res) => {
  const id = req.params.id
  const newBlog = req.body

  const blog = await Blog.findById(id)
  if (!blog)
    return res.status(404).end()

  blog.title = newBlog.title
  blog.author = newBlog.author
  blog.url = newBlog.url
  blog.likes = newBlog.likes

  await blog.save()
  logger.info('UPDATED Blog ID', id)
  res.status(200).json(blog)
})

module.exports = router
