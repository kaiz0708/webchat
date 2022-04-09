const jwt = require('jsonwebtoken');
const secret = require('../link/math');
const jwtHelper = require('../helper/jwt.helper');
let checkTokenclient = (req,res,next) => {
    const tokenClient = req.body.token || req.query.token;
}