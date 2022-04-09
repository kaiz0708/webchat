const express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
let Authenticatefacebook = (passport) => {
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });  
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret:process.env.FACEBOOK_APP_SECRET ,
        callbackURL: "http://localhost:3800/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'photos']
      },
      function(accessToken, refreshToken, profile, done) {
        const Username = {
            username : profile.displayName,
            id : profile.id , 
            picture : profile.photos[0].value
        }
        return done(null, Username);
      }
    ));
}

module.exports = Authenticatefacebook;