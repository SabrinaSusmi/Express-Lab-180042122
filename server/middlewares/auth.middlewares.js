const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

const isLoggedIn = (req,res,next) => {

    const name = localStorage.getItem('username');
    
    if (name){
        res.send(`<H1>Welcome, ${name}.</H1>`);
        localStorage.setItem("username",null);
        next();
    }else {
        //return res.json({msg: "Password incorrect!"});
        res.redirect('/users/login');
    }
}

module.exports = isLoggedIn