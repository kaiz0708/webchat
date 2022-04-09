const express = require('express')
const Router = express.Router();
const connection = require('../database/database_user');
let APIUser = (app) => {
    Router.get('/user' , (req, res)=> {
        const sql = 'select * from chat';
        connection.query(sql , (err , results) => {
            res.json({
                Accout_User : results
            })
        })
    })
    return app.use('/api/information/' , Router)
}


module.exports = APIUser