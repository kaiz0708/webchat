const express = require('express');
const connection = require('../configs/connectingDB');
const deleAPI = express.Router();

deleAPI.get('/delete/:name' , (req,res)=>{
    const  name  = req.params.name;
    const sql = 'delete from users where name=' + "'" + name + "'";
    connection.query(sql , function(err,results){
        if(err) throw err;
    })
    connection.query('select * from users' , function(err,results){
        res.status(202).json({
            message : 'ok',
            data : results
        })
    })
})

module.exports = deleAPI;
