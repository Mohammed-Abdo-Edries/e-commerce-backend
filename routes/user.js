const express = require('express')
const router = express.Router()
const { loginUser, signupUser, getAllUsers } = require('../userController')

router.post('/login', loginUser)
router.post('/signup', signupUser)
router.get('/getAllUsers', getAllUsers)

module.exports = router