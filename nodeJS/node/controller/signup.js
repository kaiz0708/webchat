const express = require('express');
const connection = require('../configs/connectingDB');
const SignUp = express.Router();

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function check_email(req , res , next){
    const { email } = req.body;
    if(validateEmail(email)){
        next();
    }else{
        res.send('Nhập đúng định dạng email');
    }
}

function Signup(req , res , next ){
    const { name , email , password  } = req.body;
    const user = {
        name : name,
        email : email,
        password : password
    }
    connection.query('SELECT * FROM users' , function(err,results,fields){
        const check = results.some(function(couse){
            return couse.email===email;
        });
    if(!check){
        connection.query("INSERT INTO users SET?", user , function(err , results){
             if (err) throw err;
         })
        next();
    }else{
        res.send('Tài khoản đã tồn tại');
        }
    });
}

SignUp.post('/signup/account' , check_email , Signup , (req,res) => {
    res.send('Đăng kí thành công');
});


module.exports = SignUp;