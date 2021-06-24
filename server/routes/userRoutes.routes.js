const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const {
    getRegister,
    postRegister,
    getLogin
  } = require('../controllers/userController');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get("/login", getLogin);

router.get("/register", getRegister);

router.post("/register", postRegister);

module.exports=router;