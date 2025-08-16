const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        const firstname = user.firstname
        const lastname = user.lastname
        const isAdmin = user.isAdmin
        res.status(200).json({ firstname, lastname, isAdmin, email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})
router.post('/signup', async (req, res) => {
    const { firstname, lastname, email, password } = req.body
    try {
        const user = await User.signup(firstname, lastname, email, password)
        const token = createToken(user._id)
        const isAdmin = user.isAdmin
        res.status(200).json({ firstname, lastname, isAdmin, email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})
router.get('/getAllUsers', async (req, res) => {
    try {
        const users = await User.find({})
        return res.json(users)
    } catch (error) {
        console.log(error);
    }
})
router.delete('/deleteAllUsers', async (req, res) => {
    try {
        const users = await User.deleteMany({})
        return res.status(200).json(users)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message })
    }
})

module.exports = router