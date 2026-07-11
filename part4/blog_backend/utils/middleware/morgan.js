const logger = require('../logger')
const morgan = require('morgan')
const app = require('../../app')


morgan.token('body', (req) => {
  return JSON.stringify(req.body)   
})

app.use(
  morgan(':method :url :status :res[content-length] :response-time ms :body')
)

logger.info('initialized morgan middleware')
