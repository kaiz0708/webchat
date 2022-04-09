const mysql  = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'infor_data',
  password : "kyanh0708"
});

module.exports = connection;