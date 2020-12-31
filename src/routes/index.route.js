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

router.get('/course-details', function (req, res) {
  res.render('guest/course-details.hbs', {
    layout: 'guest_layout'
  })
})


router.get('/course-list', function (req, res) {
  res.render('guest/course-list.hbs', {
    layout: 'guest_layout'
  })
})

router.get('/sign-up', function (req, res) {
  res.render('guest/sign-up.hbs', {
    layout: 'guest_layout'
  })
})


module.exports = router;