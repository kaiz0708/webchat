const express = require('express');
const Router = express.Router();
const connection = require('../database/database_user')
const passport = require('passport');
const { query } = require('express');
const formidable = require('formidable');
let gethomepage = (app , passport) => {
    Router.get('/' , (req,res)=>{
             res.render('homepage');
    })
    Router.get('/chathome' , (req , res) => {
      if(req.isAuthenticated()){
        const User = {
          username : req.user.username, 
          picture : req.user.picture
        }
      const PicTure = User.picture;
      if(PicTure.indexOf('https://')===-1 &&  PicTure.indexOf('.jpg')!==-1 || PicTure.indexOf('.gif')!==-1){
        res.render('chathome' , {User});
      }else{
        res.render('chathomeAuth' , {User});
    }
  }   
})
    Router.post('/signup' , passport.authenticate('local-signup' , {
        successRedirect : '/chathome',
        failureRedirect : '/',
        successFlash: true,
        failureFlash : true
    }));
    Router.post('/login' , passport.authenticate( 'local-login', {
        successRedirect : '/chathome',
        failureRedirect : '/',
        successFlash: true,
        failureFlash : true
    }));
    Router.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['public_profile', 'email']
      }));
    Router.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
          successRedirect: '/chathome',
          failureRedirect: '/'
        }));
    Router.get('/auth/google',passport.authenticate('google', { scope:
  	[ 'email', 'profile' ] }
    ));
    Router.get('/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: '/chathome',
      failureRedirect: '/',
    }));
    Router.get('/chat' , (req,res)=>{
      const User = {
        nameroom : req.query.name_of_room,
        username : req.user.username , 
        id : req.user.id,
        picture : req.user.picture
      }
      const PicTure = User.picture;
      if(req.isAuthenticated()){
          if(PicTure.indexOf('https://')===-1 && PicTure.indexOf('.jpg')!==-1 || PicTure.indexOf('.gif')!==-1){
              res.render('chat' , {User})
          }else{
              res.render('chat2' , {User})
          }
      }else{
          res.render('<h1>' + "ERROR" + '</h1>');
      }
    })
    Router.post('/upload' , (req, res) => {
        if(req.isAuthenticated()){
          var form = new formidable.IncomingForm();
          form.parse(req)
          form.on('fileBegin' , (name , file) => {
          file.filepath =  "C:/realtime/chat/public/upload/" + file.originalFilename;
          var sql = "UPDATE chat SET picture = '" + file.originalFilename + "' WHERE username = '" + req.user.username + "'";
          connection.query(sql , (err , results) =>{
              if(err) throw err;
          })
        })
            res.redirect('/')
        }else{
            res.render('<h1>' + "ERROR" + '</h1>');
        }

    })
  return app.use('/' , Router);
}


module.exports = gethomepage;