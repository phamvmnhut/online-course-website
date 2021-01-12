const express = require('express');
const app = require('../app');
const debug = require('debug')('app:admin');

const router = express.Router();
const userModel = require('./../models/user.model');
const courseModel = require('./../models/Course.model');
const { isAdmin } = require('../middleware/auth');
const db = require('./../utils/db');

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
    const query = `select course.courseid as id, course.coursename as name, user.displayname as teacher, category.categoryname as category, course.datemodified from 
    (course left join user on course.teacherid = user.userid)
    left join category on course.categoryid = category.categoryid;`;
    courses = await db.load(query);
    res.render('admin/admin-course.hbs', {
        layout: 'admin_layout',
        courseTab: true,
        courses: courses,
    });
});

router.get('/cat/field', async function(req, res) {
    const query = `select field.FieldID, field.FieldName, field.FieldDescription, ifnull(fno.NOCat, 0) as NOCat from 
    field left join (
        select fieldid, count(fieldid) as nocat from category group by category.fieldid
    ) fno on field.fieldid = fno.fieldid;`;
    fields = await db.load(query);
    res.render('admin/admin-field.hbs', {
        layout: 'admin_layout',
        categoryTab: true,
        fields: fields
    });
});

router.get('/cat/category', async function(req, res) {
    const query = `select category.CategoryName, category.CategoryID, category.CategoryDescription, field.FieldName, ifnull(cno.sl, 0) as NOCourse
    from category join field on category.fieldid = field.fieldid
    left join (select course.categoryid, count(courseid) as sl from course group by course.categoryid) cno 
        on category.categoryid = cno.categoryid;`;
    categories = await db.load(query);
    fields = await db.load('select * from field;');
    res.render('admin/admin-category.hbs', {
        layout: 'admin_layout',
        categoryTab: true,
        categories: categories,
        fields: fields,
    });
});


// router.get('/user/:id', function(req, res) {
//     id = req.params.id;
//     setTimeout(() => {
//         res.json(users.filter(e => e.ID == id)[0]);
//     }, 1000);
// })

module.exports = router;