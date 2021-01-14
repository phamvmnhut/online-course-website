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
                DisplayName: req.body.DisplayName || "NoName",
                Role: req.body.Role,
                DateCreated: req.body.DateCreated,
                Password: hash,
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
        const user = {
            Wallet: req.body.Wallet || 0,
            Email: req.body.Email,
            LastName: req.body.LastName,
            FirstName: req.body.FirstName,
            DisplayName: req.body.DisplayName || "NoName",
            UserID: req.params.id,
        }
        const re = await UserModel.patch(user)
        if (re) {
            return res.json({ status: true, re })
        }
        return res.json({ status: false })
    })
    .delete(async function(req, res) {
        const re = await UserModel.del(req.params.id);
        if (re) {
            return res.json({ status: true })
        }
        return res.json({ status: false })
    })

router.route('/course/:id')
    .delete(async function(req, res) {
        const re = await courseModel.del(req.params.id)
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

        const countCat = await db.load(`select count(*) as nocat from Category where Category.FieldID = ${fieldID}`);
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
        const query = `select Field.FieldID, Field.FieldName, Field.FieldDescription, ifnull(fno.NOCat, 0) as NOCat from 
                        Field left join (
                            select FieldID, count(FieldID) as nocat from Category where Category.FieldID = ${fieldID}
                        ) fno on Field.FieldID = fno.FieldID
                        where Field.FieldID = ${fieldID};`
        const re = await db.load(query);
        if (re) {
            return res.json({ status: false, field: re[0] });
        }
        return res.json({ status: false });
    })

router.route('/cat-category/:id')
    .get(async function(req, res) {
        catID = req.params.id;
        const query = ` select Category.CategoryName, Category.CategoryID, Category.CategoryDescription, Field.FieldName, ifnull(cno.sl, 0) as NOCourses
                        from Category join Field on Category.FieldID = Field.FieldID
                        left join (select Course.CategoryID, count(CourseID) as sl from Course group by Course.CategoryID) cno 
                            on Category.CategoryID = cno.CategoryID
                        where Category.CategoryID = ${catID};`
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

        const countCourses = await db.load(`select count(*) as nocourses from Course where Course.CategoryID = ${catID};`);

        if (countCourses[0].nocourses > 0) {
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