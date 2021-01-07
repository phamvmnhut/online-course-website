const express = require('express');
const app = require('../app');
const debug = require('debug')('app:admin');

const router = express.Router();
const userModel = require('./../models/user.model');
const { isAdmin } = require('../middleware/auth');

router.use(isAdmin)

router.get('/', async function(req, res) {
    users = await userModel.all();
    res.render('admin/admin-user.hbs', {
        layout: 'admin_layout',
        userTab: true,
        users: users,
    });
});

router.get('/user', async function(req, res) {
    users = await userModel.all();
    res.render('admin/admin-user.hbs', {
        layout: 'admin_layout',
        userTab: true,
        users: users
    });
});

router.get('/course', async function(req, res) {
    users = await userModel.all();
    res.render('admin/admin-user.hbs', {
        layout: 'admin_layout',
        userTab: true,
        users: users
    });
});

router.get('/category', function(req, res) {
    res.render('admin/index.hbs', {
        layout: 'admin_layout',
        categoryTab: true
    });
});

// router.get('/user/:id', function(req, res) {
//     id = req.params.id;
//     setTimeout(() => {
//         res.json(users.filter(e => e.ID == id)[0]);
//     }, 1000);
// })

module.exports = router;