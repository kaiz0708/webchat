const express = require('express');
const connection = require('../configs/connectingDB');
const addAPI = express.Router();

function check(req,res,next){
    const {name , email} = req.body;
    connection.query('select * from users' , function(err,results){
        const check = results.some(function(course){
            return email === course.email;
        })
        if(!check){
            next();
        }else{
            res.send('fail');
        }
    })
}

addAPI.post('/add' , check , (req,res)=>{
    const {name , email , address} = req.body;
    const user = {
        name : name,
        email : email,
        address : address
    }
    connection.query('INSERT INTO users SET?' , user , function(err,results){
        if(err) throw err;
    });
    connection.query('select * from users' , function(err,results){
        res.status(202).json({
            message : 'ok',
            data : results
        })
    })
})

module.exports = addAPI;