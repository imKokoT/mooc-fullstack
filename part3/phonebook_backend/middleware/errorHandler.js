const app = require('../app')


const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    switch (error.name) {
        default:
            return next(error)
        case 'CastError':
            return response.status(400).send({ error: 'malformed id' })
        case 'ValidationError':
            return res.status(400).json({
                error: error.message
            })
    } 
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)
