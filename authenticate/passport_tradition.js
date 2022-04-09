const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const connection = require('../database/database_user');
let authenticate = (passport) => {
    passport.serializeUser((user , done) => {
        done(null , user);    
    })
    passport.deserializeUser(( obj , done) => {
            done(null , obj);
    })
    passport.use( 'local-signup' ,  new LocalStrategy ({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    } , (req ,email, password , done)=>{
        const saltRounds = 10;
        bcrypt.hash( password, saltRounds , function(err , hash){
        const UserNameFromClient = req.body.username;
        const sql = 'select * from chat where username="' + UserNameFromClient + '"';
        connection.query(sql , (err,results) => {
            if(err){
                return done(null , false);
            }
            if(results.length!=0 && results[0].email === email ){
                return done(null , false);
            }
            const user = {
                username : UserNameFromClient,
                email : email, 
                password : hash , 
                picture : "facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d (1).jpg"
            }
            const Username = {
                username : UserNameFromClient,
                id : UserNameFromClient + hash.slice(1,10),
                picture : "facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d (1).jpg"
            }
            connection.query('insert into chat SET?' , user , (err)=>{
                if(err) throw err;
            })
            return done(null , Username);
        })
})
})); 

    passport.use('local-login' , new LocalStrategy({
        usernameField : 'email',
    } , (email , password , done) => {
        const sql = 'select * from chat where email="' + email +'"';
        connection.query(sql ,  function(err, results){
            if(err){
                return done(null , false);
            }
            bcrypt.compare(password , results[0].password , function(err , result){
                if(result===true && email===results[0].email){
                    const Username = {
                        username : results[0].username,
                        id : results[0].username + results[0].password.slice(1,10),
                        picture : results[0].picture
                    }
                    return done(null ,Username);
                }else{
                    return done(null , false);
                }
            })
        })
    }))
}
module.exports = authenticate