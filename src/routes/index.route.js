const express = require('express');
const debug = require('debug')('app:home');

const router = express.Router();

router.get('/', function (req, res) {
  debug("listing in home");
  res.render('site/home.hbs')
})

module.exports = router;