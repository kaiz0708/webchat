const express = require('express');
const Add = express.Router();
const connection = require('../configs/connectingDB');

function brower(name,email,results){
    for(let vari of results){
        if(vari.name===name || vari.email===email){
            return false;
        }
    }
    return true;
}
function check_infor(req,res,next){
    const { name , email } = req.body;
    connection.query('SELECT * FROM users' , function(err,results){
        if(brower(name,email,results)){
            next();
        }else{
            res.render('final' , {results});
        }
    })
}
Add.post('/add' , check_infor , (req,res)=> {
    
    const {name , email , address} = req.body;
    const user = {
        name : name,
        email : email,
        address : address
    }
    connection.query('INSERT INTO users SET?' , user , function(err,results){
        if(err) throw err;
    });
    res.redirect('/');
});
module.exports = Add;