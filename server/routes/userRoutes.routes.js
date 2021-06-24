const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const {
    getRegister,
    postRegister,
  } = require('../controllers/userController');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get("/login", (req,res)=>{
    res.send("Login page")
});

router.get("/register", getRegister);

router.post("/register", postRegister);

module.exports=router;