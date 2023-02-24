const express = require('express')
const router = express.Router()
const { loginUser, signupUser } = require('../userController')

router.post('/login', loginUser)
router.post('/signup', signupUser)

module.exports = router