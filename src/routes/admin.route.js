const express = require('express');
const debug = require('debug')('app:admin');

const router = express.Router();
//     `Password` varchar(50),
// `Role` tinyint not null,
// `DateCreated` datetime not null,
const users = [
  {ID:1, Wallet: 100, Avatar: 'adb1.jpg', Email:'user1@email.e', Name:'Ho Ten User1', Role: 1, DateCreated: Date()},
  {ID:2, Wallet: 200, Avatar: 'adb2.jpg', Email:'user2@email.e', Name:'Ho Ten User2', Role: 0, DateCreated: Date()},
  {ID:3, Wallet: 300, Avatar: 'adb3.jpg', Email:'user3@email.e', Name:'Ho Ten User3', Role: 2, DateCreated: Date()},
  {ID:4, Wallet: 400, Avatar: 'adb4.jpg', Email:'user4@email.e', Name:'Ho Ten User4', Role: 1, DateCreated: Date()},
  {ID:5, Wallet: 500, Avatar: 'adb5.jpg', Email:'user5@email.e', Name:'Ho Ten User5', Role: 0, DateCreated: Date()},
  {ID:6, Wallet: 600, Avatar: 'adb6.jpg', Email:'user6@email.e', Name:'Ho Ten User6', Role: 1, DateCreated: Date()},
]

router.get('/', function(req, res) {
    res.render('admin/admin-user.hbs', {
        layout: 'admin_layout',
        userTab: true,
        users: users,
    });
});

router.get('/user', function(req, res) {
    res.render('admin/admin-user.hbs', {
        layout: 'admin_layout',
        userTab: true,
        users: users
    });
});

router.get('/course', function(req, res) {
    res.render('admin/admin-user.hbs', {
        layout: 'admin_layout',
        courseTab: true,
    });
});

router.get('/category', function(req, res) {
    res.render('admin/index.hbs', {
        layout: 'admin_layout',
        categoryTab: true
    });
});

router.get('/user/:id',function(req, res){
    id = req.params.id;
    res.json(users[id - 1]);
})

module.exports = router;