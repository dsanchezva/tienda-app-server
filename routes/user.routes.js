const router = require("express").Router();
const User = require("../models/User.model")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//POST "/user/signup" => create a new user un the db
router.post("/signup", async (req, res, next) => {
   const { username, password, email } = req.body;
   
   
   
   
   
   
   
    try {

    }catch (e) {
        next(e);
    }
})


module.exports = router;