var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'MyWebsite' });
});

router.post('/', function(req, res, next) {
    req.app.set('username', req.body.username);
    // console.log(req.body.username);
    res.redirect('/user');
});

module.exports = router;
