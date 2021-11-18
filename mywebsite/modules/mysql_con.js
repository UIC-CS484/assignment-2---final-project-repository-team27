
var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: process.env.SQL_USERNAME,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


