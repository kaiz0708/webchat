const express = require('express');
const Repair = express.Router();
const connection = require('../configs/connectingDB');

Repair.post('/repair' , (req,res) => {
    const { oldname , name , email , address} = req.body;
    const sql = 'select * from users where name=' + "'" + oldname + "'";
    connection.query(sql,(err,results) => {
        const updatData = "UPDATE users SET email=" + "'" + email +"' ," + "address=" + "'" + address + "'" + "WHERE" + " name=" + "'" + oldname + "';"
        connection.query(updatData , (req,res)=>{
            if(err) throw err;
            console.log(updatData)
        });
    });
    res.redirect('/');
});

module.exports = Repair;