const express = require('express');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host   : "localhost",
    user : "root" , 
    password : "kyanh0708",
    database : "webchat"
})

module.exports = connection;