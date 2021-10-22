var express = require('express');
var router = express.Router();
const passport = require('passport');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'MyWebsite' });
});

router.post('/', passport.authenticate('local', {
  successRedirect: '/user',
  failureRedirect: '/login',
  failureFlash: true
}));

module.exports = router;
