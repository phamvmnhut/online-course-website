const express = require('express');
const debug = require('debug')('app:home');

const router = express.Router();

router.get('/', function (req, res) {
  debug("listing in home");
  res.render('guest/home.hbs', {
    layout: 'guest_layout'
  })
})


router.get('/home', function(req, res) {
  res.render('guest/home',{
      layout: 'guest_layout'
  });
});



module.exports = router;