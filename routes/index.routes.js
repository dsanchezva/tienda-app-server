const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

//all routes with comment
const commentRoute = require('./comment.routes')
router.use("/comment", commentRoute);

//all routes for user
const userRoute = require('./user.routes')
router.use("/user", userRoute);

//all router for articles
const articlesRoute = require('./article.routes')
router.use("/articles", articlesRoute);

module.exports = router;
