const express = require('express');
const connection = require('../configs/connectingDB');
const changeAPI = express.Router();

function check_pass(req,res,next){
    const { email , pass , new_pass } = req.body;
    const sql = 'select pass from user where email=' + "'" +email+ "'";
    connection.query(sql, function(err,results){
        if(results.length===0 || pass!==new_pass){
            res.send('Đổi mật khẩu thất bại');
        }else{
            next();
        }
    })
}
changeAPI.post('/change' , check_pass , (req , res) => {
    const {email , pass} = req.body;
    const sql = "update user set pass=" + "'" + pass + "'  WHERE email=" + "'" + email + "' ;";
    connection.query(sql , function(err,results){
        if(err) throw err;
    });
    const sql2 = 'select * from user where email=' + "'" + email + "'";
    connection.query(sql2, function(err,results){
        res.status(202).json({
            message : 'ok',
            data : results
        })
    })
});

module.exports = changeAPI;