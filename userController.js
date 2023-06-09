const User = require('./models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

const loginUser = async (req, res) => {
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
}

const signupUser = async (req, res) => {
    const { firstname, lastname, email, password } = req.body
    try {
        const user = await User.signup(firstname, lastname, email, password)
        const token = createToken(user._id)
        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
        return res.json(users)
    } catch (error) {
        console.log(error);
    }
}
module.exports = { signupUser, loginUser, getAllUsers }