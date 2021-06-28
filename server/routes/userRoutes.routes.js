const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const isLoggedIn = require("../middlewares/auth.middlewares");
const {
    getRegister,
    postRegister,
    getLogin,
    postLogin,
    getDashboard
  } = require('../controllers/userController');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.route("/dashboard").all(isLoggedIn).get(getDashboard);

router.get("/login", getLogin);

router.post("/login", postLogin);

router.get("/register", getRegister);

router.post("/register", postRegister);

module.exports=router;