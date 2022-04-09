const express = require('express');
const connection = require('../configs/connectingDB');
const jwtHelper = require('../helper/jwt.helper');
const loginAPI = express.Router();
require('dotenv').config('./.env');
function check(req,res,next){
    const {email , pass} = req.body;
    const sql = "select pass from user where email=" + "'" + email + "'";
    connection.query(sql , function(err,results){
        if(results.length===0 || results[0].pass!==pass){
            res.send('fail');
        }else{
            next();
        }
    });
}
loginAPI.post('/login' , check ,  (req,res) => {
    const token = jwtHelper.createToken(req.body , process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_LIFE)
})


module.exports = loginAPI;