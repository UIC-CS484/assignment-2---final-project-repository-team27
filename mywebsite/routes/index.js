var express = require('express');
var router = express.Router();
var mysqlcon = require('../modules/mysql_con.js')

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("user", req.user);
    // console.log(req.app.get('email'));
    console.log("authenticated, ", req.isAuthenticated());
  res.render('index', { title: 'MyWebsite' });
});

module.exports = router;
