const express = require('express');
const Login = express.Router();
const connection = require('../configs/connectingDB');
const jwtHelper = require('../helper/jwt.helper');
const passport = require("passport");
const bcrypt = require('bcrypt');
var LocalStrategy = require('passport-local').Strategy;
require('dotenv').config('./.env');

Login.post('/login' , passport.authenticate('local' , {
    successRedirect : '/link',
    failureRedirect : '/link',
    failureFlash : true
}));
module.exports = Login;