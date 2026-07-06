const app = require('./app.js')
// middleware
require('./middleware/morgan')
// routes
require('./routes/persons')
require('./routes/info')

// settings
const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
