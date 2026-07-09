require('dotenv').config()
const express = require('express')

// init express app
const app = require('./app.js')
// middleware
require('./middleware/morgan')
app.use(express.json())
// load frontend
app.use(express.static('dist'))
// routes
require('./routes/persons')
require('./routes/info')

// settings
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
