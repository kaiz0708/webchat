const express = require('express');
const connection = require('../configs/connectingDB');
const getUser = express.Router();

getUser.get('/getuser' , (req,res) => {
    connection.query('select * from users' , function(err,results){
        console.log(results);
        res.status(202).json({
            message : "ok",
            data : results
        })
    })
});

module.exports = getUser ;
