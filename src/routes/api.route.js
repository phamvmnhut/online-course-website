const express = require('express');
const debug = require('debug')('app:api');
const bcrypt = require('bcryptjs');

const { isAdmin } = require('../middleware/auth');

const { validateEmail } = require('../utils/validate');

const { UserModel } = require('../models');
const courseModel = require('../models/Course.model');
const catModel = require('./../models/category.model');

const db = require('../utils/db');

const router = express.Router();

router.get('/', function(req, res) {
    return res.send("this is guide to use api for this website")
})
router.get('/is-available', async function(req, res) {
    const email = req.query.email;
    const user = await UserModel.singleByEmail(email);
    if (user === null) {
        return res.json(true);
    }

    return res.json(false);
})

router.use(isAdmin)

router.route('/user')
    .get(async function(req, res) {
        const users = await UserModel.all();
        return res.json({
            total: users.length,
            users
        })
    })
    .post(async function(req, res) {
        const hash = bcrypt.hashSync(req.body.Password, 10);
        if (!validateEmail(req.body.Email)) {
            return res.json({ status: false, err: 'Invalid Email'})
        }
        try {
            const user = {
                Wallet: req.body.Wallet || 0,
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
        } catch {
            return res.json({ status: false})
        }
    })

router.route('/user/:id')
    .get(async function(req, res) {
        const user = await UserModel.single(req.params.id)
        if (user) {
            return res.json({ status: true, user })
        }
        return res.json({ status: false })

    })
    .patch(async function(req, res) {
        const user = await UserModel.patch(req.body)
        if (user) {
            return res.json({ status: true, user })
        }
        return res.json({ status: false })
    })
    .delete(async function(req, res) {
        const re = await UserModel.patch(req.body)
        if (re) {
            return res.json({ status: true })
        }
        return res.json({ status: false })
    })

router.route('/course/:id')
    .delete(async function(req, res) {
        const re = await courseModel.del({ ID: req.params.id })
        if (re) {
            return res.json({ status: true })
        }
        return res.json({ status: false })
    })

router.route('/cat-field')
    .post(async function(req, res) {
        var field = { FieldName: req.body.FieldName, FieldDescription: req.body.FieldDescription };
        const re = await catModel.addField(field);
        return res.json({ status: (re ? true : false) });
    })
    .delete(async function(req, res) {
        fieldID = req.body.FieldID;
        const countCat = await db.load(`select count(*) as nocat from category where category.fieldid = ${fieldID}`);
        if (countCat[0].nocat > 0) {
            return res.json({ status: false });
        }
        const re = await catModel.delField(req.body);
        return res.json({ status: (re ? true : false)});
    })
    .patch(async function(req, res) {
        const re = await catModel.patchField(req.body);
        return res.json({ status: (re ? true : false) });
    });

router.route('/cat-field/:id')
.get(async function(req, res){
  fieldID = req.params.id;
  const query = `select field.FieldID, field.FieldName, field.FieldDescription, ifnull(fno.NOCat, 0) as NOCat from 
  field left join (
      select fieldid, count(fieldid) as nocat from category where category.fieldid = ${fieldID}
  ) fno on field.fieldid = fno.fieldid
  where field.fieldid = ${fieldID};`
  const re = await db.load(query);
  if (re) {
    return res.json({status: false, field: re[0]});
  }
  return res.json({status: false});
})

module.exports = router;