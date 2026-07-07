const express = require('express')
const app = require('./app.js')
// middleware
require('./middleware/morgan')
// require('./middleware/cors')
// routes
require('./routes/persons')
require('./routes/info')

// settings
const PORT = process.env.PORT || 3001

// load frontend
app.use(express.static('dist'))

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
