const User = require('../models/userModel')

const onlyAdmin = async (req, res, next) => {
    const email = req.headers.email;
    const user = await User.findOne({ email })
    if (user.isAdmin) {
        next()
    } else {
        return res.status(400).json({ messege: "your not an admin" })
    }
};
module.exports = onlyAdmin;