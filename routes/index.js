var express = require('express');
var router = express.Router();
// var mysqlcon = require('../modules/mysql_con.js')
// const bcrypt = require('bcrypt');

/* GET home page. */
router.get('/', async function(req, res, next) {
    // const hashedPassword = await bcrypt.hash("dave", 10);
    // console.log(hashedPassword)
    // console.log("user", req.user);
    // console.log(req.app.get('email'));
    console.log("authenticated, ", req.isAuthenticated());
  res.render('index', { title: 'MyWebsite' });
});

module.exports = router;
