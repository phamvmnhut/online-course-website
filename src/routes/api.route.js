const express = require('express');
const debug = require('debug')('app:api');
const bcrypt = require('bcryptjs');

const { isAuth, isAdmin } = require('../middleware/auth');

const { validateEmail } = require('../utils/validate');

const { UserModel, PurchaseModel } = require('../models');
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

router.use(isAuth);

router.route('/wish')
    .get(async function (req, res) {
        const UserID = req.session.authUser.UserID;
        const wish_list = await PurchaseModel.getWishByStudentID(UserID);
        return res.json({
            status: true,
            wish_length: wish_list.length,
            data: wish_list
        });
    })
    .post(async function (req, res) {
        const CourseID = req.body.CourseID;
        const StudentID = req.session.authUser.UserID;
        const newWished = await PurchaseModel.addWish({ CourseID, StudentID })
        const wish = await PurchaseModel.getWishByStudentID(StudentID);
        return res.json({
            status: true,
            wish_length: wish.length,
            data: newWished,
        })
    })
    .delete(async function (req, res) {
        const CourseID = req.body.CourseID;
        const StudentID = req.session.authUser.UserID;
        await PurchaseModel.delWish({ CourseID, StudentID })
        const wish_list = await PurchaseModel.getWishByStudentID(StudentID);
        return res.json({
            status: true,
            wish_length: wish_list.length,
            data: wish_list
        })
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
            return res.json({ status: false, err: 'Invalid Email' })
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
            return res.json({ status: false })
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
        return res.json({ status: (re ? true : false) });
    })
    .patch(async function(req, res) {
        const re = await catModel.patchField(req.body);
        return res.json({ status: (re ? true : false) });
    });

router.route('/cat-field/:id')
    .get(async function(req, res) {
        fieldID = req.params.id;
        const query = `select field.FieldID, field.FieldName, field.FieldDescription, ifnull(fno.NOCat, 0) as NOCat from 
  field left join (
      select fieldid, count(fieldid) as nocat from category where category.fieldid = ${fieldID}
  ) fno on field.fieldid = fno.fieldid
  where field.fieldid = ${fieldID};`
        const re = await db.load(query);
        if (re) {
            return res.json({ status: false, field: re[0] });
        }
        return res.json({ status: false });
    })

router.route('/cat-category/:id')
    .get(async function(req, res) {
        catID = req.params.id;
        const query = ` select category.CategoryName, category.CategoryID, category.CategoryDescription, field.FieldName, ifnull(cno.sl, 0) as NOCourse
                        from category join field on category.fieldid = field.fieldid
                        left join (select course.categoryid, count(courseid) as sl from course group by course.categoryid) cno 
                            on category.categoryid = cno.categoryid
                        where category.categoryid = ${catID};`
        const re = await db.load(query);
        if (re) {
            return res.json({ status: false, cat: re[0] });
        }
        return res.json({ status: false });
    })

router.route('/cat-category')
    .post(async function(req, res) {
        var cat = { CategoryName: req.body.CategoryName, CategoryDescription: req.body.CategoryDescription, FieldID: req.body.FieldID};
        const re = await catModel.add(cat);
        return res.json({ status: (re ? true : false) });
    })
    .delete(async function(req, res) {
        catID = req.body.CategoryID;

        const countCourse = await db.load(`select count(*) as nocourse from course where course.categoryid = ${catID};`);

        if (countCourse[0].nocourse > 0) {
            return res.json({ status: false });
        }
        const re = await catModel.del(req.body);
        return res.json({ status: (re ? true : false) });
    })
    .patch(async function(req, res) {
        const re = await catModel.path(req.body);
        return res.json({ status: (re ? true : false) });
    });


module.exports = router;