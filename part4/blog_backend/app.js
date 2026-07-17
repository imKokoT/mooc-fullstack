const express = require('express')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const config = require('./utils/config')

const app = express()
module.exports = app

logger.info('connecting to db...')
mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() =>
    logger.info('connected successfully')
  ).catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

// pre middleware
app.use(express.json())
require('./utils/middleware/morgan')

// static

// routes
app.use('/api/blogs', require('./routes/blogs'))
app.use('/api/users', require('./routes/users'))
app.use('/api/login', require('./routes/login'))
app.use('/api/signup', require('./routes/signup'))

// post middleware
require('./utils/middleware/errorHandler')
