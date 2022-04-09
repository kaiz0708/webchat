const express = require('express');
const connection = require('../configs/connectingDB');
const Router = express.Router();
const getUser = require('../webAPIs/getUser');
const addAPI = require("../webAPIs/addAPI");
const deleAPI = require('../webAPIs/deleteAPI');
const repairAPI = require('../webAPIs/repairAPI');
const getAPIs = (app) => {
    Router.get('/getuser' , getUser);
    Router.post('/add' , addAPI);
    Router.get('/delete/:name' , deleAPI);
    Router.post('/repair' , repairAPI);
    return app.use('/api/v2/' , Router);
}

module.exports = getAPIs;