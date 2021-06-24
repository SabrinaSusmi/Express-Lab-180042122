const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const {
    getRegister,
    postRegister,
    getLogin,
    postLogin
  } = require('../controllers/userController');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get("/login", getLogin);

router.post("/login", postLogin);

router.get("/register", getRegister);

router.post("/register", postRegister);

module.exports=router;