const router = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')


router.get('/', async (req, res) => {
  res.sendStatus(501)
})

router.get('/:id',async (req, res) => {
  res.sendStatus(501)
})

module.exports = router
