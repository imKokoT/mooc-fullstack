const express = require('express')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const config = require('./utils/config')

const app = express()
module.exports = app

if (process.env.NODE_ENV !== 'production')
  logger.warning('application is starting in dev-mode!')

logger.info('connecting to db...')
mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() =>
    logger.info('connected successfully')
  ).catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })
mongoose.set('transactionAsyncLocalStorage', true)

// pre middleware
app.use(express.json())
require('./utils/middleware/morgan')

// static

// routes
app.use('/api/blogs', require('./routes/blogs'))
app.use('/api/users', require('./routes/users'))
app.use('/api/login', require('./routes/login'))
app.use('/api/signup', require('./routes/signup'))

if (process.env.NODE_ENV === 'test')
  app.use('/api/testing', require('./routes/testing'))

// post middleware
require('./utils/middleware/errorHandler')
