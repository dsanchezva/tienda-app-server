const router = require("express").Router();

//POST "/comment/create", to create a new comment
router.post("/create", async (req, res, next) => {
    try{

    }catch(e){
        next(e);
    }
})




module.exports = router;