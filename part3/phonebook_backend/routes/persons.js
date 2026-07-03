const app = require('../app.js')
const { persons } = require('../data.js')

app.get('/api/persons', (request, response) => {
  response.json(persons)
})
