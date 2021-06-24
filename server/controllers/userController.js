const registerForm = require('../models/userModel.models');

const getRegister = (req,res)=> {
    res.sendFile("register.html", { root: "./views/users" });
};

const postRegister = (req,res)=>{

    const {username, email, gender, password} = req.body

    if(!username || !email || !gender || !password) {
        return res.json({msg: "Fill in the empty fields!"});
    }
    if(password.length < 6){
        return res.json({msg: "Password must be atleast 6 characters!"});
    }
    const registerUser = new registerForm ({
        username:username,
        email:email,
        gender:gender,
        password:password
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