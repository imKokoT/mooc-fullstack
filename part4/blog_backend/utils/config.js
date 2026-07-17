require('dotenv').config()

const PORT = process.env.PORT

const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

const DEBUG = process.env.APP_DEBUG === '1'

module.exports = { 
  MONGODB_URI,
  PORT,
  DEBUG
}
