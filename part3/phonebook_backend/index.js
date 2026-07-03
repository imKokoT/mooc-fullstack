const app = require('./app.js')
// routes
require('./routes/persons')
require('./routes/info.js')

// settings
const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
