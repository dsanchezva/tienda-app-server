const router = require("express").Router();

//POST "/articles/create" => create a new article in the database
router.post("/create", async (req, res, next) => {


    try {

    }catch(e) {
        next(e);
    }
})


module.exports = router;