const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get("/login", (req,res)=>{
    res.send("Login page")
});

router.get("/register", (req,res)=>{
    res.sendFile("register.html", { root: "./views/users" });
});

router.post("/register", (req,res)=>{
    const username = req.body.username;
    const email = req.body.email;
    res.send(
      `<H1>user with Email - ${email} and Username - ${username} is requesting to login.</H1>`
    );
});

module.exports=router;