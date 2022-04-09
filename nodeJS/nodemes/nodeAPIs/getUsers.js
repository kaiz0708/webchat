const express = require('express');
const connection = require('../configs/connectingDB');
const getUsers = express.Router();
const jwt = require('jsonwebtoken');
getUsers.get('/user' , (req,res)=> {
    connection.query('select * from user' , function(err,results){
        res.status(202).json({
            message : "ok",
            data : results
        })
    })
    console.log(req.query.token);
})
module.exports = getUsers;
