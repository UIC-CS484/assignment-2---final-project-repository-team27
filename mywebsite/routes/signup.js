var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Sign up to MyWebsite' });
});

router.post('/', function(req, res, next) {
  res.render('signup', { signup: true });
});

module.exports = router;
