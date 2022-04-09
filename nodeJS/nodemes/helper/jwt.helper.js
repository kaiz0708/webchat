const jwt = require('jsonwebtoken');

let createToken = (user , secret , tokenLife) => {
    return jwt.sign(user, secret ,{expiresIn: tokenLife});
}

let checkToken = (token , secret) => {
   return new Promise((resolve , reject) => {
       jwt.verify(token , secret , (err,decode)=>{
           if(err){
               return reject(err);
           }
           resolve(decode);
       })
   })
}


module.exports = {
    createToken : createToken,
    checkToken : checkToken
}