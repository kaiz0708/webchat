const express = require('express');
const connection = require('../configs/connectingDB');
const add = require('../controller/add');
const dele = require('../controller/delete');
const repair = require('../controller/repair');
const Router = express.Router();
const gethomePage = (app) => {
    Router.get('/' , (req,res) => {
        connection.query("SELECT * FROM users ", function(err,results){
            res.render('choose' , {results});
        })
    });
    Router.get('/repair' , (req,res) => {
        connection.query("SELECT * FROM users" , function(err,results){
            res.render('repair' , {results});
        }) 
    } );
    Router.get('/repair' , repair);
    Router.post('/add' , add);
    Router.get('/delete/:name' , dele );
    return app.use('/' , Router);
}


module.exports = gethomePage;