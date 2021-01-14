const express = require('express');
const app = require('../app');
const debug = require('debug')('app:admin');

const router = express.Router();
const { UserModel, CourseModel, CategoryModel} = require('../models');
const { isAdmin } = require('../middleware/auth');
const db = require('./../utils/db');
const config = require('../config/default.json')

router.use(isAdmin)

router.get('/', async function(req, res) {
    res.redirect('/admin/user?page=1');
});

router.get('/user', async function(req, res) {
    const roleParsed = parseInt(req.query.role);
    const role = isNaN(roleParsed) ? -1 : roleParsed;
    const page = Math.max(1, +req.query.page || 1);
    const limit = config.pagination.limit;
    const offset = (page - 1) * limit;
    const nousers = await UserModel.totalUses(role);
    const nopages = Math.ceil(nousers / limit);
    users = await UserModel.allByRole(role, limit, offset);
    res.render('admin/admin-user.hbs', {
        layout: 'admin_layout',
        userTab: true,
        role: role,
        users: users,
        nopages: nopages,
        curpage: page,
    });
});


router.get('/course', async function(req, res) {
    const key = req.query.key;
    const cat = req.query.category;
    const no_min = req.query['no-min'];
    const no_max = req.query['no-max'];
    const w_min = req.query['w-min'];
    const w_max = req.query['w-max'];

    const page = Math.max(1, +req.query.page || 1);
    const limit = config.pagination.limit;
    const offset = (page - 1) * limit;
    await CourseModel.loadCourseView({key, cat, no_min, no_max, w_min, w_max});

    categories = await CategoryModel.all();
    courses = await CourseModel.getCoursesFromView(limit, offset);
    const nousers = await CourseModel.getTotalCoursesInView();
    const nopages = Math.ceil(nousers / limit);
    
    res.render('admin/admin-course.hbs', {
        layout: 'admin_layout',
        courseTab: true,
        courses: courses,
        nopages: nopages,
        curpage: page,
        categories: categories
    });
});

router.get('/cat/field', async function(req, res) {
    const query = `select Field.FieldID, Field.FieldName, Field.FieldDescription, ifnull(fno.NOCat, 0) as NOCat from 
    Field left join (
        select FieldID, count(*) as nocat from Category group by Category.FieldID
    ) fno on Field.FieldID = fno.FieldID;`;
    fields = await db.load(query);
    res.render('admin/admin-field.hbs', {
        layout: 'admin_layout',
        categoryTab: true,
        fields: fields
    });
});

router.get('/cat/category', async function(req, res) {
    const query = `select Category.CategoryName, Category.CategoryID, Category.CategoryDescription, Field.FieldName, ifnull(cno.sl, 0) as NOCourses
    from Category join Field on Category.FieldID = Field.FieldID
    left join (select Course.CategoryID, count(CourseID) as sl from Course group by Course.CategoryID) cno 
        on Category.Categoryid = cno.CategoryID;`;
    categories = await db.load(query);
    fields = await db.load('select * from Field;');
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