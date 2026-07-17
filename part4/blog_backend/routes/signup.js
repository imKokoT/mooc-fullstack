const router = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 10


router.post('/', async (req, res) => {
  const { username, password } = {
    username: req.body.username.trim(),
    password: req.body.password.trim()
  } 

  if(username.length < 3)
    return res.status(400).json( {error: 'username must be at least 3 characters long'})
  if(password.length < 3)
    return res.status(400).json( {error: 'password must be at least 3 characters long'})

  const user = await User.findOne({ username })
  if (user)
    return res.status(409).json({ error: 'user already exists' })

  const newUser = new User({
    username: username,
    password: await bcrypt.hash(password, SALT_ROUNDS)
  })
  
  await newUser.save()
  logger.info(`new user ${newUser.id} was created`)
  res.sendStatus(201)
})

module.exports = router
