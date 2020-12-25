const express = require('express');
const debug = require('debug')('app:home');

const router = express.Router();

router.get('/', function (req, res) {
  debug("listing in home");
  res.render('site/home.hbs')
})


router.get('/home', function(req, res) {
  res.render('guest/home',{
      layout: 'guestLayout'
  });
});



module.exports = router;