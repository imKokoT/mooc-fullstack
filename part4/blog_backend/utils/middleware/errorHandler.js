const logger = require('../logger')
const app = require('../../app')


const errorHandler = (error, req, res, next) => {
  logger.error(error.message)

  switch (error.name) {
    default:
      res.status(500).end()
      next(error)
      break
    case 'CastError':
      return res.status(400).send({ error: 'malformed id' })
    case 'ValidationError':
      if (error.code === 11000)
        return res.status(409).send({ error: 'duplicate values was detected' })

      res.status(400).json({
        error: error.message
      })
      break
  }
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)
logger.info('initialized errorHandler middleware')
