const express = require('express');
const debug = require('debug')('app:api');

const { UserModel } = require('../models')

const router = express.Router();

router.get('/', function(req, res){
  return res.send("this is guide to use api for this website")
})
router.get('/is-available', async function (req, res) {
  const email = req.query.email;
  const user = await UserModel.singleByEmail(email);
  if (user === null) {
    return res.json(true);
  }

  return res.json(false);
})

module.exports = router;