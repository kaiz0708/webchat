const express = require('express');
const connection = require('../configs/connectingDB');
const forgotAPI = express.Router();

function check_email(req,res,next){
    const { email } = req.body;
    const sql = 'select pass from user where email=' + "'" + email + "'";
    connection.query(sql , function(err,results){
        if(results.length===0){
           res.send('không thể lấy lại mật khẩu');
        }else{
             next();
        }
    })
}

forgotAPI.post('/forgot' , check_email, (req,res)=> {
    const { email } = req.body;
    const sql = 'select pass from user where email=' + "'" + email + "'";
    connection.query(sql , function(err,results){
        res.status(202).json({
            message : 'ok',
            data : results
        })
    })
})


module.exports = forgotAPI;