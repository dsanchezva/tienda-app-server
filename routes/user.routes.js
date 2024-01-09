const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//POST "/user/signup" => create a new user un the db
router.post("/signup", async (req, res, next) => {
  const { username, password, email } = req.body;
  console.log(req.body);

  if (!username || !password || !email) {
    res
      .status(400)
      .json({ errorMessage: "You must provide all required fields" });

    return;
  }

  const regexEmail =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
  //check the format of the email
  if (regexEmail.test(email) === false) {
    res.status(400).json({ errorMessage: "The email is not valid" });
    return;
  }

  const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  // check the format for the password
  if (regexPassword.test(password) === false) {
    res.status(400).json({
      errorMessage:
        "Password must contain on upper case, one lower case, a number and at least 8 caracters",
    });
    return;
  }

  try {
    //generate the salt for bcrypt
    const salt = await bcrypt.genSalt(12);
    //encrypt the password
    const cryptedPassword = await bcrypt.hash(password, salt)
    
    //check if the email already exist in the database
    const foundUserEmail = await User.findOne({ email })
    if (foundUserEmail) {
        res.status(400).json({
            errorMessage: "Email already exist",
          })
    } 
    //check if the username already exist
    const foundUserUsername = await User.findOne({ username })
    if (foundUserUsername){
        res.status(400).json({
            errorMessage: "Username already taken",
          })
    }

    await User.create({username, password: cryptedPassword, email})
    res.status(200).json("User created successfully");


  } catch (e) {
    next(e);
  }
});
//POST "/user/login"
router.post("/login", async (req, res, next) =>{
const { username, password } = req.body
console.log(req.body)
if (!username || !password) {
    res.status(400).json({errorMessage: "You must field all required field"})
    return;
}

try {
    const loggedUser = await User.findOne({username})
    if (!loggedUser) {
        res.status(400).json({errorMessage: "User not found"})
        return;
    }

    const isPasswordValid = await bcrypt.compare(password, loggedUser.password);
    if (!isPasswordValid) {
        res.status(400).json({errorMessage: "Password is not valid"})
        return
    }

    const payload = {
        _id: logedUser._id,
      username: logedUser.username,
      role: logedUser.role, 
    }
    




}catch(e) {
    next(e)
}

})
module.exports = router;
