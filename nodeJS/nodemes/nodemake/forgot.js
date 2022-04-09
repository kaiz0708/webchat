const express = require('express');
const Forgot = express.Router();
const connection = require('../configs/connectingDB');
Forgot.post('/forgot' , function(req , res){
    const { email } = req.body;
    const sql = 'SELECT pass FROM new_table WHERE email=' + "'" + email + "'";
    connection.query(sql, function(err,results){
        var pass = results[0].pass;
        res.render('forgot' , {pass} );
})
});

module.exports = Forgot;