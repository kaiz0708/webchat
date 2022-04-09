const express = require('express');
const File = express.Router();
const formidable = require('formidable');
const path = require('path');
const connection = require('../configs/connectingDB');
File.post('/upload', (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.parse(req);
  form.on('fileBegin' , function(name , file){
    file.filepath = '/nodeJS/nodemes/public/upload/' + file.originalFilename;
    res.render('picture' , {nameFile: file.originalFilename});
  });
});

module.exports = File;