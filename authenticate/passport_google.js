const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

let Authenticategoogle = (passport) => {
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });  
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_APP_ID,
        clientSecret:process.env.GOOGLE_APP_SECRET ,
        callbackURL: "http://localhost:3800/auth/google/callback",
        profileFields: ['id', 'displayName', 'photos']
      },
      function(accessToken, refreshToken, profile, done) {
          const Username = {
            username :  profile.displayName,
            id : profile.id , 
            picture : profile.photos[0].value
          }
          return done(null, Username);
      }
    ));
}

module.exports = Authenticategoogle;