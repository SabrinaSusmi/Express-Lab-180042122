const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
const registerForm = require('../models/userModel.models');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get("/login", (req,res)=>{
    res.send("Login page")
});

router.get("/register", (req,res)=>{
    res.sendFile("register.html", { root: "./views/users" });
});

router.post("/register", (req,res)=>{
    
    const registerUser = new registerForm ({
        username:req.body.username,
        email:req.body.email,
        gender:req.body.gender,
        password:req.body.password
    })
    registerUser.save()
    .then(data => {
        res.json(data)
    })
    .catch(error => {
        res.json(error)
    })
});

module.exports=router;