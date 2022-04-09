const express = require('express');
const connection = require('../configs/connectingDB');
const Router = express.Router();
const login = require('../nodemake/login');
const change = require('../nodemake/change');
const create = require('../nodemake/create');
const forgot = require('../nodemake/forgot');
const file = require('../nodemake/file');
const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const gethomePage = (app , passport) => {

    Router.get('/login', (req, res) =>  {
        res.render('home');
    });
    Router.get('/createAccout' , (req,res)=>{
        res.render('createAccout')
    })
    Router.get('/homem' , (req,res)=>{
        res.render('homem')
    })
    Router.get('/change' , (req,res) => {
     res.render('change');
    });
    Router.get('/forgot' , (req , res) => {
        res.render('forgot');
    });
    Router.post('/login' , passport.authenticate('local' , {
        successRedirect : '/link',
        failureRedirect : '/login',
        failureFlash : true
    }));
    Router.post('/createAccout' , create);
    Router.post('/change' , change);
    Router.post('/forgot' , forgot);
    Router.post('/upload' , file);
    Router.get('/link' , (req,res) => {
        res.render('link');
    })
    return app.use('/' , Router);
}

module.exports = gethomePage;