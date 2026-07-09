require('dotenv').config()
const express = require('express')

// init express app
const app = require('./app.js')
// middleware
require('./middleware/morgan')
app.use(express.json())
// load frontend
app.use(express.static('dist')) // reason why this here is in order to give static faster, after go to routes; also to mate static always reachable 
// routes
require('./routes/persons')
require('./routes/info')
// handlers
require('./middleware/errorHandler') // as i understood doe to calling middlewares in the registered order, if we want to process errors, we should to pass it after the routes 

// settings
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
