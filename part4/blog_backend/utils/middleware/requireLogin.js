const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const { getTokenFrom } = require('../misc')


async function requireLogin(req, res, next) {
  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    
  const user = await User.findById(decodedToken.id)
  if (!user)
    return res.status(400).json({ error: 'UserId missing or not valid' })
  
  req.user = user
  next()
}

module.exports = requireLogin
