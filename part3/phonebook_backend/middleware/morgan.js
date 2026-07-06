var morgan = require('morgan')
var app = require('../app')


morgan.token('body', (req) => {
  return JSON.stringify(req.body)   
})

app.use(
    morgan(':method :url :status :res[content-length] :response-time ms :body')
    // morgan('tiny')
)

console.debug('initialized morgan middleware')
