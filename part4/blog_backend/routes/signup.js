const router = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 10


router.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })
  if (user) {
    res.status(409).json({ error: 'user already exists' })
    return
  }

  const newUser = new User({
    username: username,
    password: await bcrypt.hash(password, SALT_ROUNDS)
  })
  
  await newUser.save()
  logger.info(`new user ${newUser.id} was created`)
  res.sendStatus(201)
})

module.exports = router
