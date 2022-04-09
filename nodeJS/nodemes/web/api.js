const express = require('express');
const connection = require('../configs/connectingDB');
const Router = express.Router();
const getUser = require('../nodeAPIs/getUsers');
const loginAPI = require('../nodeAPIs/loginAPI');
const createAPI = require('../nodeAPIs/createAPI');
const changeAPI = require('../nodeAPIs/changeAPI');
const forgotAPI = require('../nodeAPIs/forgotAPI');
const getAPIs = (app) => {
    Router.get('/user' , getUser);
    Router.post('/login' , loginAPI);
    Router.post('/create' , createAPI);
    Router.post('/change' , changeAPI);
    Router.post('/forgot' , forgotAPI);
    return app.use('/api/v1/' , Router);
}

module.exports = getAPIs;