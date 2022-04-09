const express = require('express');
const Delete = express.Router();
const connection = require('../configs/connectingDB');

Delete.get('/delete/:name' , (req,res) => {
    const name = req.params.name;
    const sql = "DELETE FROM users WHERE name=" + "'" + name + "'";
    connection.query(sql , (err,results) => {
        if(err) throw err;
    });
    res.redirect('/');
});
module.exports = Delete;