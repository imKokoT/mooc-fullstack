const router = require('express').Router()
const Blog = require('../models/blog')


router.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

router.post('/', async (req, res) => {
  const blog = new Blog(req.body)

  const result = await blog.save()
  res.status(201).json(result)
})

router.get('/:id', async (req, res) => {
  const id = req.params.id

  const blog = await Blog.findById(id)
  if (!blog)
    return res.status(404).end()

  res.json(blog)
})

module.exports = router
