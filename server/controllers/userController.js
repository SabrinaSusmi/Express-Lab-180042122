const registerForm = require('../models/userModel.models');
const alert = require('alert');
const bcrypt = require('bcrypt');
var LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage("./scratch");

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
    const user = await registerForm.findOne({email})
    if(user) {
        return res.json({msg: "User with same email already exists."})
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

const getLogin = (req,res)=> {
    res.sendFile("login.html", { root: "./views/users" });
};

const postLogin = async (req, res) => {
    const { email, password } = req.body;
    
    const user = await registerForm.findOne({email});
    if(!user) {
        return res.json({msg: "User with the email doesn't exist."});
    }

    const checkPass = await bcrypt.compare(password, user.password)
    if(!checkPass) {
        return res.json({msg: "Password incorrect!"});
    }
    else {
        localStorage.setItem("username", user.username);
    }

    //res.json({msg:"Logged in"});
    res.redirect('/dashboard');
};

const getDashboard = (req,res)=> {
    const name = localStorage.getItem('username');
    res.send(`<H1>Welcome, ${name}.</H1>`);
};

module.exports = { getRegister, postRegister, getLogin, postLogin, getDashboard };