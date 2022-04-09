const express = require('express');
const Create = express.Router();
const connection = require('../configs/connectingDB');
const bcrypt = require('bcrypt');
// function validateEmail(email) {
//     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
// }

// function check_email(req , res , next){
//     const { email } = req.body;
//     if(validateEmail(email)){
//         next();
//     }else{
//             res.send('fail');
//     }
// }
// function signup(req,res,next){
//     const { email } = req.body;
//     const sql = 'select pass from user where email=' + "'" + email + "'";
//     connection.query(sql , function(err,results){
//         if(results.length===0){
//             next();
//         }else{
//             res.send('Đăng kí thất bại');
//         }
//     })
// }

Create.post('/createAccout',(req,res) => {
    const { username , password } = req.body;
    const saltRounds = 10;
    // bcrypt.hash(myPlaintextPassword , saltRounds , function(err,hash){
       const users = {
        email : username,
        pass : password
    }
    connection.query('INSERT INTO new_table SET?' , users,  function(err,results){
        if(err) throw err;
    });
    res.send('Đăng kí thành công');
    // })
    
});
module.exports = Create;