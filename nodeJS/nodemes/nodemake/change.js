const express = require('express');
const Change = express.Router();
const jwt = require('../helper/jwt.helper');          
const connection = require("../configs/connectingDB");
require('dotenv').config('./.env');
function checkToken (req,res,next){
       const token = jwt.checkToken(req.headers['token'] , process.env.ACCESS_TOKEN_SECRET);
       token.then(token => {
           return next();
       }).catch(err =>{
           const {email} = req.body;
           const tokennew = jwt.createToken({email} , process.env.ACCESS_TOKEN_SECRET , process.env.ACCESS_TOKEN_LIFE);
           const check = jwt.checkToken(tokennew,process.env.ACCESS_TOKEN_SECRET);
           check.then(tokennew =>{
               next();
           })
       })
}
function check_pass(req,res,next){
    const { email , pass , new_pass } = req.body;
    console.log(req.body);
    const sql = 'select pass from new_table where email=' + "'" +email+ "'";
    connection.query(sql, function(err,results){
        if(results.length===0 || pass!==new_pass){
            res.send('Đổi mật khẩu thất bại');
        }else{
            next();
        }
    })
}
Change.post('/change' , checkToken ,  check_pass , (req , res) => {
    const {email , pass} = req.body;
    const sql = "update new_table set pass=" + "'" + pass + "'  WHERE email=" + "'" + email + "'";
    connection.query(sql , function(err,results){
        if(err) throw err;
    })
        res.redirect('link');
});
module.exports = Change;