const onlyAdmin = (req, res, next) => {
    if(req.user.role == "admin") {
        next();
    } else {
        res.status(401).json({ mssg: "your not an Admin!" });
    }
};
module.exports = onlyAdmin;