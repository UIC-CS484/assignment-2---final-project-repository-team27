var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.app.get('username'))
  res.render('user', { title: 'MyWebsite', username: req.app.get('username') });
});

module.exports = router;
