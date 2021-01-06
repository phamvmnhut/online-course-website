const express = require('express');
const debug = require('debug')('app:home');
const bcrypt = require('bcryptjs');

const { validateEmail } = require('../utils/validate');

const { UserModel, CategoryModel, CourseModel} = require('../models')

const router = express.Router();

// route for guest
router.get('/', async function (req, res) {
  const catewithfield = await CategoryModel.withField();
  return res.render('guest/home.hbs', {
    title: "Home",
    catewithfield
  })
})

router.route('/login')
  .get(function (req, res) { 
    if (req.headers.referer) {
      req.session.retUrl = req.headers.referer;
    }
    return res.render('guest/login.hbs', {title: 'Login'})
  })
  .post( async function (req, res) {
    const user = await UserModel.singleByEmail(req.body.email);
    if (user === null) {
      req.flash("error", "Fail to sign in account");
      return res.redirect('/login')
    }

    const ret = bcrypt.compareSync(req.body.password, user.Password);
    if (ret === false) {
      req.flash("error", "Fail to sign in account");
      return res.redirect('/login')
    }

    req.session.isAuth = true;
    req.session.authUser = user;

    let url = req.session.retUrl || '/';
    if (url.endsWith("/login") || url.endsWith('/register')) url = '/'
    return res.redirect(url);
  })

router.route('/register')
  .get(function (req, res) {
    return res.render('guest/register.hbs', {title: "Register"})
  })
  .post(async function (req, res, next) {
    const hash = bcrypt.hashSync(req.body.password, 10);
    if (!validateEmail(req.body.email)) {
      req.flash("error", "Fail to register user")
      return res.redirect('/resgister');
    }
    const user = {
      Wallet: 0,
      Avatar: "",
      Email: req.body.email,
      LastName: req.body.last_name,
      FirstName: req.body.first_name,
      Password: hash,
      DisplayName: req.body.display_name || "NoName",
      Role: 0,
      DateCreated: new Date(),
    }
    try {
      await UserModel.add(user)
      req.flash("success", "Register success, it's realdy to login");
      return res.redirect('/login');
    }
    catch (err){
      debug(err)
      req.flash("error", "Fail to register user")
      return res.redirect('/register');
    }
  })

router.route('/logout')
  .get(function (req, res) {
    return res.render('guest/logout.hbs', { title: "Logout" })
  })
  .post(function (req, res) {
    req.session.isAuth = false;
    req.session.authUser = null;
    return res.redirect('/');
  })
  
router.get('/courses', async function (req, res) {
  debug({"query": req.query})
  // by cate 
  let courses = [];
  if (req.query.cate != undefined){
    if (req.query.cate != 0){
      courses = await CourseModel.getByCate(req.query.cate);
    }
    else {
      courses = await CourseModel.all();
    }
  } else { // final case
    courses = await CourseModel.all();
  }


  // by name


  // return respon
  const cates = await CategoryModel.all();

  return res.render('guest/course_list.hbs', {
    layout: 'guest_layout',
    cates,
    courses
  })
})

router.get('/course_details/(:id)?', async function (req, res) {
  debug({ params: req.params.id });
  const countRate = await CourseModel.getCountRate(req.params.id);
  console.log()

  if (req.params.id == undefined) req.params.id = Math.floor(Math.random() * Math.floor(10));
  try {
    const course = await CourseModel.getSingleByID(req.params.id);
    const rates = await CourseModel.getRates(req.params.id)
    if (course)
      return res.render('guest/course_details.hbs', {
        title: course.Name,
        course,
        countRate: countRate[0].sl,
        rates
      })
    else {
      req.flash("noti", "Dont exit this course with this ID");
      return res.redirect('/');
    }
  } catch (e){
debug({e})
    req.flash("warn", "Have warnning to do this action");
    return res.redirect('/');
  }
})


router.get('/search_results', function (req, res) {
  res.render('guest/search_results.hbs', {
    layout: 'guest_layout'
  })
})



//user
router.get('/watch_list', function (req, res) {
  res.render('user/watch_list.hbs', {
    layout: 'user_layout'
  })
})

router.get('/user_profile', function (req, res) {
  res.render('user/profile.hbs', {
    layout: 'user_layout'
  })
})

router.get('/registered_list', function (req, res) {
  res.render('user/registered_list.hbs', {
    layout: 'user_layout'
  })
})

router.get('/feedback', function (req, res) {
  res.render('user/feedback.hbs', {
    layout: 'rating_layout'
  })
})

router.get('/studying', function (req, res) {
  res.render('user/studying.hbs', {
    layout: 'user_layout'
  })
})

//teacher
router.get('/teacher_profile', function (req, res) {
  res.render('teacher/profile.hbs', {
    layout: 'teacher_layout'
  })
})

router.get('/update_course', function (req, res) {
  res.render('teacher/update_course.hbs', {
    layout: 'teacher_layout'
  })
})

router.get('/upload_course', function (req, res) {
  res.render('teacher/upload_course.hbs', {
    layout: 'teacher_layout'
  })
})


module.exports = router;