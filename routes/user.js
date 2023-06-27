const express = require('express')
const router = express.Router()
const { loginUser, signupUser, getAllUsers, deleteAllUsers } = require('../userController')

router.post('/login', loginUser)
router.post('/signup', signupUser)
router.get('/getAllUsers', getAllUsers)
router.delete('/deleteAllUsers', deleteAllUsers)

module.exports = router