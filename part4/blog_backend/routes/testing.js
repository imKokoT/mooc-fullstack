const router = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')
const logger = require('../utils/logger')


router.post('/reset', async (req, res) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  logger.info('reset testing database')
  res.statusCode(204)
})

module.exports = router
