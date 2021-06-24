const registerForm = require('../models/userModel.models');

const getRegister = (req,res)=> {
    res.sendFile("register.html", { root: "./views/users" });
};

const postRegister = (req,res)=>{

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
};

module.exports = { getRegister, postRegister };