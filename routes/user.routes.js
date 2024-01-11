const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isValidToken = require("../middlewares/user.middleware");
const Order = require("../models/Order.models");

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
    const cryptedPassword = await bcrypt.hash(password, salt);

    //check if the email already exist in the database
    const foundUserEmail = await User.findOne({ email });
    if (foundUserEmail) {
      res.status(400).json({
        errorMessage: "Email already exist",
      });
    }
    //check if the username already exist
    const foundUserUsername = await User.findOne({ username });
    if (foundUserUsername) {
      res.status(400).json({
        errorMessage: "Username already taken",
      });
    }

    await User.create({ username, password: cryptedPassword, email });
    res.status(200).json("User created successfully");
  } catch (e) {
    next(e);
  }
});
//POST "/user/login"
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  console.log(req.body);
  if (!username || !password) {
    res.status(400).json({ errorMessage: "You must field all required field" });
    return;
  }

  try {
    const loggedUser = await User.findOne({ username });
    if (!loggedUser) {
      res.status(400).json({ errorMessage: "User not found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, loggedUser.password);
    if (!isPasswordValid) {
      res.status(400).json({ errorMessage: "Password is not valid" });
      return;
    }
    const payload = {
      _id: loggedUser._id,
      username: loggedUser.username,
      admin: loggedUser.role === "admin" ? true : false,
    };
    console.log(payload);
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).json({ authToken });
  } catch (e) {
    next(e);
  }
});

//PATCH "/users/address" ==> add adress info to the database
router.patch("/adress", isValidToken, async (req, res, next) => {
  const { name, surname, street, city, region, zipCode, country } = req.body;
  const user = req.payload._id;
  console.log(req.body);

  if (
    !name ||
    !surname ||
    !street ||
    !city ||
    !region ||
    !zipCode ||
    !country
  ) {
    res.status(404).json({ errorMessage: "You must fill all fields" });
    return;
  }
  const adressData = {
      name,
      surname,
      street,
      city,
      region,
      zipCode,
      country,
    }

  try {
    await User.findByIdAndUpdate(user, {adress: adressData});
    res.status(200).json("Adress updated");
  } catch (e) {
    next(e);
  }
});

//DELETE "/user/delete" => delete a user from the website
router.delete("/delete", isValidToken, async (req, res, next) => {
  const userId = req.payload._id;
  try {
    await Order.deleteMany({ user: { _id: userId } });
    await Comment.deleteMany({ user: { _id: userId } });
    await User.findByIdAndDelete(userId);
    res.status(200).json("The user has been deleted");
  } catch (e) {
    next(e);
  }
});

router.get("/verify", isValidToken, (req, res, next) => {
  res.json({ payload: req.payload });
});
module.exports = router;
