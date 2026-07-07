const app = require('../app')
const cors = require('cors')

app.use(cors())

console.debug('initialized cors middleware')
