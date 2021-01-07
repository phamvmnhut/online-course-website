const express = require('express');
const debug = require('debug')('app:home');
const bcrypt = require('bcryptjs');

const { validateEmail } = require('../utils/validate');

const { isAuth } = require('../middleware/auth');

const { UserModel, CategoryModel, CourseModel, PurchaseModel} = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();

// route for guest
router.get('/', async function (req, res) {
  const catewithfield = await CategoryModel.withField();
  return res.render('guest/home.hbs', {
    title: "Home",
    page: 'home',
    catewithfield
  })
})

router.route('/login')
  .get(function (req, res) { 
    if (req.headers.referer) {
      req.session.retUrl = req.headers.referer;
    }
    return res.render('guest/login.hbs', {title: 'Login', page: 'home',})
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
    
    if (user.Role == 2) {
      res.redirect('/admin');
      return;
    }
    let url = req.session.retUrl || '/';
    if (url.endsWith("/login") || url.endsWith('/register')) url = '/'
    return res.redirect(url);
  })

router.route('/register')
  .get(function (req, res) {
    return res.render('guest/register.hbs', {title: "Register", page: 'home',})
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
    return res.render('guest/logout.hbs', { title: "Logout", page: 'home', })
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

  let indexTosetActive = 0;
  const cates = await CategoryModel.all();

  if (req.query.cate == undefined || req.query.cate == 0){ 
    req.query.cate = 0
    courses = await CourseModel.all();
    indexTosetActive = cates.length -1;
  }
  if (req.query.cate != 0){
    courses = await CourseModel.getByCate(req.query.cate);
    indexTosetActive = cates.findIndex(x => x.ID == req.query.cate);
  }
  cates[indexTosetActive]["Active"] = true;

  // sort
  if (courses.length > 1) {
    if (req.query.sort != undefined) {
      if (req.query.sort == 'price') {
        courses.sort((a, b) => a.Price > b.Price )
      }
      if (req.query.sort == 'rate') {
        courses.sort((a, b) => a.Price > b.Price )
      }
    }
  }
  // by name
  if (courses.length > 0) {
    if (req.query.search != undefined) {
      if (req.query.search.length > 4) {
        // thuc hien search
      } else {
        delete req.query.search
      }
    }
  }

  return res.render('guest/course_list.hbs', {tile:"Course", page: 'course', cates, courses })
})

router.get('/detail/(:id)?', async function (req, res) {
  let userID = 0
  if (req.session.isAuth) {userID = req.session.authUser.ID}
  if (req.params.id == undefined) req.params.id = Math.floor(Math.random() * Math.floor(10));
  try {
    const course = await CourseModel.getSingleByID(req.params.id);
    const rates = await CourseModel.getRates(req.params.id);
    const rateInfo = await CourseModel.getRateInfo(req.params.id);
    const soleInfo = await CourseModel.getSoleInfo(req.params.id, userID);
    if (course)
      return res.render('guest/course_details.hbs', {
        title: course.Name,
        page: 'course',
        course,
        rateInfo,
        soleInfo,
        rates,
        activeID: req.params.id
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


// route for all user
router.get('/user', isAuth , function (req, res) {
  res.render('user/profile.hbs', {
    title: 'User',
    page: 'student',
  })
})

// student
router.route('/confirm/:id')
  .get(isAuth, async function (req, res) {
    debug({ params: req.params.id });
    try {
      const user = await UserModel.single(req.session.authUser.ID);
      const course = await CourseModel.getSingleByID(req.params.id);
      const balanse = user.Wallet - course.Price;
      console.log({ balanse })
      if (course)
        return res.render('user/confirm.hbs', {
          title: course.Name,
          course,
          user,
          balanse,
          isOK: balanse >= 0
        })
      else {
        req.flash("noti", "Dont exit this course with this ID");
        return res.redirect('/');
      }
    } catch (e) {
      debug({ e })
      req.flash("warn", "Have warnning to do this action");
      return res.redirect('/');
    }
  })
  .post(isAuth, async function (req, res, next) {
    try {
      const user = await UserModel.single(req.session.authUser.ID);
      const course = await CourseModel.getSingleByID(req.params.id);
      const balanse = user.Wallet - course.Price;
      if (balanse < 0) {
        req.flash("error", "You dont have enough money")
        return res.redirect('/');
      }
      // update user wallet
      const userUpdate = { ID: user.ID, 'Wallet': balanse }
      await UserModel.patch(userUpdate)
      // update register course
      await PurchaseModel.add({ CourseID: course.ID, StudentID: user.ID })
      req.flash('success', 'You just register succesll this course');
      return res.redirect(`/study/${course.ID}`)
    } catch (err) {
      debug(err)
      req.flash('error', 'Register for this course is Fail');
      return res.redirect('/')
    }
  })

router.route('/wish')
  .get(isAuth, async function (req, res) {
    try {
      const StudentID = req.session.authUser.ID;
      const my_id_courses = await PurchaseModel.getWishByStudentID(StudentID);
      let my_courses = [];
      for (let i = 0; i < my_id_courses.length; i++) {
        try {
          const course = await CourseModel.getSingleByID(my_id_courses[i].CourseID);
          const rateInfo = await CourseModel.getRateInfo(my_id_courses[i].CourseID);
          my_courses.push({ ...course, ...rateInfo })
        } catch (err) {
          debug(err)
        }
      }
      // debug(my_courses)
      return res.render('user/watch_list.hbs', {
        title: 'Watch List',
        page: 'student',
        isEmpty: my_courses.length == 0,
        my_courses
      })
    } catch (err) {
      debug(err)
      req.flash("error", "Fail to fetch course")
      return res.render('user/watch_list.hbs', {
        title: 'My Sourse',
        page: 'student',
        isEmpty: true,
      })
    }
  })
  .post(isAuth, async function (req, res) {
    try {
      const CourseID = req.body.CourseID;
      const StudentID = req.session.studentID
      await PurchaseModel.delWish({CourseID, StudentID})
      req.flash('warn', 'Delete success')
    }
    catch(error) {
      debug(error)
      req.flash('error', 'Delete error')
    }
    return res.redirect('/wish');
  })

router.get('/my-course', isAuth , async function (req, res) {
  try {
    const StudentID = req.session.authUser.ID;
    const my_id_courses = await PurchaseModel.getByStudentID(StudentID);
    let my_courses = [];
    for(let i=0; i<my_id_courses.length;i++){
      try {
        const course = await CourseModel.getSingleByID(my_id_courses[i].CourseID);
        const rateInfo = await CourseModel.getRateInfo(my_id_courses[i].CourseID);
        my_courses.push({...course, ...rateInfo})
      } catch (err) {
        debug(err)
      }
    }
    // debug(my_courses)
    return res.render('user/my_course.hbs', {
      title: 'My Sourse',
      page: 'student',
      isEmpty: my_courses.length == 0,
      my_courses
    })
  } catch (err) {
    debug(err)
    req.flash("error", "Fail to fetch course")
    return res.render('user/my_course.hbs', {
      title: 'My Sourse',
      page: 'student',
      isEmpty: true,
    })
  }
});

router.get('/feedback', function (req, res) {
  res.render('user/feedback.hbs', {
  })
})

router.get('/study/:id', isAuth, function (req, res) {
  res.render('user/studying.hbs', {
    title: 'Learning',
    page: 'student'
  })
})

// teacher
router.get('/update_course', function (req, res) {
  res.render('teacher/update_course.hbs', {
  })
})

router.get('/upload_course', function (req, res) {
  res.render('teacher/upload_course.hbs', {
  })
})

module.exports = router;