const jwt = require("jsonwebtoken");

const isValidToken = (req, res, next) => {

    try {
        const token = req.headers.authorization.replace("Bearer ", "")
        const payload = jwt.verify(token, process.env.TOKEN_SECRET)
        req.payload = payload
        next()

    }catch(err) {
        res.status(400).json({errorMessage: "Invalid token"});
    }





}

module.exports = isValidToken;