const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('../configs/connectingDB');

let authenticate = (passport) => {
    passport.serializeUser((user , done) => {
        try {
             done(null , user.email);
        } catch (error) {
            console.log('jiji');
            console.log(err);
        }
       
    })
    passport.deserializeUser(( email  , done) => {
        const sql = 'select * from new_table where email="' + email + '"' 
        connection.query(sql, function(err , results){
            try {
                done(null , results[0]);
           } catch (error) {
               console.log('jijppp');
               console.log(err);
           }
        })
    })
    passport.use( 'local', new LocalStrategy((username, password , done) => {
        const sql = 'select * from new_table where email="' + username + '"';
        connection.query(sql, function(err,results){
            console.log('lolo' , results[0].pass , password);
            if(results===undefined){
                return done(null , false , {err : "err"});
            }else{
                if(results[0].pass !== password){
                    return done(null , false , {err : "error"})
                }
            }
                return done(null , results[0]);
            })
        }))
}

module.exports = authenticate;