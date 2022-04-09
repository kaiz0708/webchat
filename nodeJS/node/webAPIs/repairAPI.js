const express = require('express');
const connection = require('../configs/connectingDB');
const repairAPI = express.Router();

repairAPI.post('/repair' , (req,res) => {
    const { oldname , name , email , address} = req.body;
    const updatData = "UPDATE users SET email=" + "'" + email +"' ," + "address=" + "'" + address + "'" + "WHERE" + " name=" + "'" + oldname + "';"
        connection.query(updatData , function(err,results){
           if(err) throw err;
        });
        connection.query('select * from users' , function(err,results){
            res.status(202).json({
                data : results
            })
        })
});

module.exports = repairAPI;