const express = require('express');
const debug = require('debug')('app:api');

const { isAdmin } = require('../middleware/auth');

const { validateEmail } = require('../utils/validate');

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

router.use(isAdmin)

router.route('/user')
  .get(async function (req, res) {
    const users = await UserModel.all();
    return res.json({
      total: users.length,
      users
    })
  })
  .post(async function (req, res) {
    const hash = bcrypt.hashSync(req.body.password, 10);
    if (!validateEmail(req.body.email)) {
      return res.json({status: false})
    }
    const user = {
      Wallet: 0,
      Avatar: "",
      Email: req.body.Email,
      LastName: req.body.LastName,
      FirstName: req.body.FirstName,
      Password: hash,
      DisplayName: req.body.DisplayName || "NoName",
      Role: req.body.Role || 0,
      DateCreated: new Date(),
    }
    const userNew = await UserModel.add(user);
    return res.json({
      status: true,
      user: userNew
    })
  })

router.route('/user/:id')
  .get(async function (req, res){
    return await UserModel.single(req.params.id)
  })
  .patch(async function(req, res) {
    return await UserModel.patch(req.body)
  })
  .delete(async function(req, res) {
    return await UserModel.del(reqq.params.id)
  })





  

module.exports = router;