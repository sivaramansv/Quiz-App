//logout.js page
//@author: Sivaraman
//@description: This page is responsible for destroying the session variables
var express = require('express');
var router = express.Router();

/* GET logout page. */
router.get('/', function(req, res, next) {
  req.session.destroy();
  res.render('index', { tagline: "Logged out successfully" });
});

module.exports = router;