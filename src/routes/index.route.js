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

router.get('/course_details', function (req, res) {
  res.render('guest/course_details.hbs', {
    layout: 'guest_layout'
  })
})


router.get('/course_list', function (req, res) {
  res.render('guest/course_list.hbs', {
    layout: 'guest_layout'
  })
})

router.get('/sign_up', function (req, res) {
  res.render('guest/sign_up.hbs', {
    layout: 'guest_layout'
  })
})

router.get('/search_results', function (req, res) {
  res.render('guest/search_results.hbs', {
    layout: 'guest_layout'
  })
})

router.get('/log_in', function (req, res) {
  res.render('guest/log_in.hbs', {
    layout: 'guest_layout'
  })
})

module.exports = router;