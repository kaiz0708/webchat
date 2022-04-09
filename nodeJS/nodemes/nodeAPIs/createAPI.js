const express = require('express');
const connection = require('../configs/connectingDB');
const createAPI = express.Router();
function check(req,res,next){
    const { email } = req.body;
    const sql = 'select pass from user where email=' + "'" + email + "'";
    connection.query(sql , function(err,results){
        console.log(results);
        if(results.length===0){
            next();
        }else{
            res.send('Đăng kí thất bại');
        }
    })
}
createAPI.post('/create' , check , (req,res) => {
    const { email , pass } = req.body;
    const users = {
        email : email,
        pass : pass
    }
    connection.query('INSERT INTO user SET?' , users , function(err,results){
        if(err) throw err;
    });
    connection.query('select * from user' , function(err,results){
        res.status(202).json({
            message : 'ok',
            data : results
        })
    })
})

module.exports = createAPI;