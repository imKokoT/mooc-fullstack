const router = require('express').Router()
const User = require('../models/user')


router.get('/', async (req, res) => {
  const users = await User.find({})
    .select('-password')
    .populate('blogs')
  
  res.json(users)
})

router.get('/:id',async (req, res) => {
  const id = req.params.id

  const user = await User.findById(id)
    .select('-password')
    .populate('blogs')
  if (!user)
    return res.status(404).end()

  res.json(user)
})

module.exports = router
