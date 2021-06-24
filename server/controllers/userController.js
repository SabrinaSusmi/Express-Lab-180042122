const registerForm = require('../models/userModel.models');
const alert = require('alert');
const bcrypt = require('bcrypt');

const getRegister = (req,res)=> {
    res.sendFile("register.html", { root: "./views/users" });
};

const postRegister = async (req,res)=>{

    const {username, email, gender, password, repassword } = req.body

    if(!username || !email || !gender || !password || !repassword) {
        //alert("Fill in the empty fields!");
        //window.alert("Fill in the empty fields!");
        res.json({msg: "Fill in the empty fields!"});
        return res.redirect("/register");
    }
    if(password.length < 6){
        return res.json({msg: "Password must be atleast 6 characters!"});
    }

    const passwordEncrypted = await bcrypt.hash(password, 10)

    if(repassword!=password) {
        return res.json({msg: "Passwords dont match!"});
    }


    const registerUser = new registerForm ({
        username:username,
        email:email,
        gender:gender,
        password:passwordEncrypted
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