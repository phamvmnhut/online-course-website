const express = require('express');
const debug = require('debug')('app:home');
const bcrypt = require('bcryptjs');

const { validateEmail } = require('../utils/validate');

const { UserModel, CategoryModel, CourseModel, PurchaseModel, LessonModel} = require('../models');

const { isAuth, isTeacher } = require('../middleware/auth');
const isTeacherOwnCourse = async function (req, res, next) {
  const TeacherID = req.session.authUser.UserID;
  const course = await CourseModel.getSingleByID(req.params.CourseID);
  if (!course) {
    req.flash('Dont have this course')
    return res.redirect('/own-course');
  }
  if (course.TeacherID != TeacherID) {
    req.flash('You dont have permission to this action')
    return res.redirect('/own-course');
  }
  req.course = course;
  return next();
}

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
    const userNew = await UserModel.add(user);
    if ( ! userNew){
      req.flash("error", "Fail to register user")
      return res.redirect('/register');
    }
    req.flash("success", "Register success, it's realdy to login");
    return res.redirect('/login');
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
  debug("query:", req.query)
  // by cate 
  let courses = [];

  let indexTosetActive = 0;
  const cates = await CategoryModel.all();

  if (req.query.cate == undefined || req.query.cate == 0){ 
    req.query.cate = 0
    courses = await CourseModel.allCompleted();
    indexTosetActive = cates.length -1;
  }
  if (req.query.cate != 0){
    courses = await CourseModel.getByCate(req.query.cate);
    indexTosetActive = cates.findIndex(x => x.CategoryID == req.query.cate);
  }
  cates[indexTosetActive]["Active"] = true;

  // sort
  if (courses.length > 1) {
    if (req.query.sort != undefined) {
      if (req.query.sort == 'price') {
        courses.sort((a, b) => a.Price > b.Price )
      }
      if (req.query.sort == 'rate') {
        courses.sort((a, b) => a.Point > b.Point )
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

  return res.render('guest/course_list.hbs', {
    title:"Course", 
    page: 'course', cates, 
    courses_length: courses.length, 
    courses 
  })
})

router.get('/detail/(:id)?', async function (req, res) {
  let userID = 0
  if (req.session.isAuth) {userID = req.session.authUser.UserID}
  if (req.params.id == undefined) req.params.id = Math.floor(Math.random() * Math.floor(10));

  const course = await CourseModel.getSingleByID(req.params.id);
  if (!course) {
    req.flash("noti", "Dont exit this course with this ID");
    return res.redirect('/');
  }
  const rates = await CourseModel.getRates(req.params.id);
  const soleInfo = await CourseModel.getSoleInfo(req.params.id, userID);
  const relatedCourse = await CourseModel.getByCate(course.CategoryID);

  return res.render('guest/course_details.hbs', {
    title: course.Name,
    page: 'course',
    course,
    rates,
    soleInfo,
    relatedCourse,
    activeID: req.params.id
  })
})


// route for all user
router.get('/user', isAuth, async function (req, res) {
  const UserID = req.session.authUser.UserID
  const user = await UserModel.single(UserID);
  if (!user) {
    req.flash("error", "Have error in get user Info");
    return res.redirect('/');
  }
  return res.render('user/profile-view.hbs', {
    title: 'User',
    page: 'home',
    user,
    isTeacher: user.role === 1
  })
});

router.route('/user/edit')
  .get(isAuth, async function (req, res) {
    const UserID = req.session.authUser.UserID
    const user = await UserModel.single(UserID);
    if (!user) {
      req.flash("error", "Have error in get user Info");
      return res.redirect('/');
    }
    return res.render('user/profile-edit.hbs', {
      title: 'User',
      page: 'home',
      user
    })
  })
  .post(isAuth, async function (req, res) {
    const UserID = req.session.authUser.UserID
    const user = await UserModel.single(UserID)
    if (user === null) {
      req.flash("error", "Error in find this user account");
      return res.redirect('/user')
    }
    const ret = bcrypt.compareSync(req.body.OldPassword, user.Password);
    if (ret === false) {
      req.flash("error", "Please enter correct your password");
      return res.redirect('/user')
    }

    let userUpdate = {
      UserID,
    }
    if (req.body.OldPassword == undefined) {
      req.flash("error", "Please enter your old password")
      return res.redirect('/user');
    }

    userUpdate = req.body.FirstName !== "" ? { ...userUpdate, FirstName: req.body.FirstName } : userUpdate;
    userUpdate = req.body.LastName !== "" ? { ...userUpdate, LastName: req.body.LastName } : userUpdate,
    userUpdate = req.body.DisplayName !== "" ? { ...userUpdate, DisplayName: req.body.DisplayName } : userUpdate;
    if (req.body.Email !== "") {
      if (!validateEmail(req.body.Email)) {
        req.flash("error", "Fail to update user with this info")
        return res.redirect('/user');
      }
      else userUpdate = { ...userUpdate, Email: req.body.Email }
    }
    if (req.body.NewPassword !== "") {
      const hash = bcrypt.hashSync(req.body.NewPassword, 10);
      userUpdate = { ...userUpdate, Password: hash }
    }
    debug({userUpdate})
    const userUpdated = await UserModel.patch(userUpdate)
    req.session.isAuth = true;
    req.session.authUser = userUpdated;
    debug({ userUpdated })
    req.flash("success", "Udate user info success")
    return res.redirect('/user');
  })

// student
router.route('/confirm/:CourseID')
  .get(isAuth, async function (req, res) {
    const user = await UserModel.single(req.session.authUser.UserID);
    const course = await CourseModel.getSingleByID(req.params.CourseID);
    if (!course) {
      req.flash("noti", "Your course you wait is not exist");
      return res.redirect('/courses');
    }
    const balanse = user.Wallet - course.Price;
    return res.render('user/confirm.hbs', {
      title: course.Name,
      course,
      user,
      balanse,
      isOK: balanse >= 0
    })
  })
  .post(isAuth, async function (req, res) {
    const UserID = req.session.authUser.UserID
    const user = await UserModel.single(UserID);
    const course = await CourseModel.getSingleByID(req.params.CourseID);
    if (!course) {
      req.flash("noti", "Your course you wait is not exist");
      return res.redirect('/courses');
    }
    const balanse = user.Wallet - course.Price;
    if (balanse < 0) {
      req.flash("error", "You dont have enough money")
      return res.redirect(req.get('referer'));
    }
    // update user wallet
    const userUpdate = { UserID, 'Wallet': balanse }
    await UserModel.patch(userUpdate)
    // update register course
    const newPurchased = await PurchaseModel.add({ CourseID: course.CourseID, StudentID: user.UserID })
    debug({newPurchased})
    req.flash('success', 'You just register succesll this course');
    return res.redirect(`/study/${course.CourseID}`)
  })

router.route('/wish')
  .get(isAuth, async function (req, res) {
    const StudentID = req.session.authUser.UserID;
    const my_id_courses = await PurchaseModel.getWishByStudentID(StudentID);
    let my_courses = [];
    for (const e of my_id_courses) {
      const course = await CourseModel.getSingleByID(e.CourseID)
      my_courses.push(course)
    }
    return res.render('user/watch_list.hbs', {
      title: 'Watch List',
      page: 'student',
      isEmpty: my_courses.length == 0,
      my_courses
    })
  })
  .post(isAuth, async function (req, res) {
    const CourseID = req.body.CourseID;
    const StudentID = req.session.authUser.UserID;
    const newWished = await PurchaseModel.addWish({ CourseID, StudentID })
    const wish = await PurchaseModel.getWishByStudentID(StudentID);
    return res.json({
      status: true,
      data: newWished,
      wish_length: wish.length,
    })
  })

router.get('/my-course', isAuth, async function (req, res) {
  const StudentID = req.session.authUser.UserID;
  const my_id_courses = await PurchaseModel.getByStudentID(StudentID);
  let my_courses = [];
  for (const e of my_id_courses) {
    const course = await CourseModel.getSingleByID(e.CourseID)
    my_courses.push(course)
  }
  return res.render('user/my_course.hbs', {
    title: 'My Sourse',
    page: 'student',
    isEmpty: my_courses.length == 0,
    my_courses
  })
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
router.get('/own-course', isTeacher, async function (req, res) {
  const TeacherID = req.session.authUser.UserID;
  const own_courses = await CourseModel.getByTeacherID(TeacherID);
  return res.render('teacher/own_course.hbs', {
    title: 'Own Sourse',
    page: 'teacher',
    isEmpty: own_courses.length == 0,
    own_courses
  })
});
router.route('/own-course/add')
  .get(isTeacher, async function (req, res) {
    const cates = await CategoryModel.all();
    return res.render('teacher/course-add.hbs', {
      title: 'Own Sourse',
      page: 'teacher',
      cates
    })
  })
  .post(isTeacher, async function (req, res) {
    const TeacherID = req.session.authUser.UserID;
    const newCourse = await CourseModel.add({...req.body, TeacherID})
    if (!newCourse) {
      req.flash('error', 'Fail to add new course')
      return res.redirect('/own-course')
    }
    req.flash('success', 'Success to add new Course')
    return res.redirect('/own-course')
  })
router.route('/own-course/:CourseID/edit')
  .get(isTeacher, isTeacherOwnCourse, async function (req, res) {
    const lessons = await LessonModel.getByCourseID(req.course.CourseID);
    const rates = await CourseModel.getRates(req.course.CourseID);
    const cates = await CategoryModel.all();
    return res.render('teacher/course-edit.hbs', {
      title: 'Own Sourse',
      page: 'teacher',
      course : req.course,
      cates,
      lessons,
      rates
    })
  })
  .post(isTeacher, isTeacherOwnCourse, async function (req, res) {
    const updateCourse = { ...req.body, CourseID: req.course.CourseID, TeacherID: req.session.authUser.UserID};
    const updatedCourse = await CourseModel.path(updateCourse)
    if (!updatedCourse) {
      req.flash('error', "update fail Course")
      return res.redirect(req.get('referer'))
    }
    req.flash('success', "update success Course")
    return res.redirect('/own-course')
  })
router.route('/own-course/:CourseID/del')
  .get(isTeacher, async function (req, res) {
    return res.render('teacher/course-del.hbs', {
      title: 'Own Sourse',
      page: 'teacher',
    })
  })
  .post(isTeacher, async function (req, res) {
    return res.redirect('/own-course')
  })

router.route('/own-course/:CourseID/lesson/add')
  .get(isTeacher, isTeacherOwnCourse, async function (req, res) {
    return res.render('teacher/lesson-add.hbs', {
      title: 'Own Sourse',
      page: 'teacher',
      course: req.course
    })
  })
  .post(isTeacher, isTeacherOwnCourse, async function (req, res) {
    const CourseID = req.course.CourseID;
    const newLesson = await LessonModel.add({ ...req.body, CourseID })
    if (!newLesson) {
      req.flash('error', 'Fail to add new lesson')
      return res.redirect(req.get('referer'))
    }
    req.flash('success', 'Success to add new Lesson')
    return res.redirect(`/own-course/${CourseID}/edit`)
  })
router.route('/own-course/:CourseID/lesson/:Section/edit')
  .get(isTeacher, isTeacherOwnCourse, async function (req, res) {
    const lesson = await LessonModel.getBySection(req.params.Section)
    return res.render('teacher/lesson-edit.hbs', {
      title: 'Own Sourse',
      page: 'teacher',
      course: req.course,
      lesson,
    })
  })
  .post(isTeacher, isTeacherOwnCourse, async function (req, res) {
    const Section = req.params.Section
    const newLesson = await LessonModel.patch({ ...req.body, Section })
    if (!newLesson) {
      req.flash('error', 'Fail to add new lesson')
      return res.redirect(req.get('referer'))
    }
    req.flash('success', 'Success to add new Lesson')
    return res.redirect(`/own-course/${req.course.CourseID}/edit`)
  })
router.route('/own-course/:CourseID/lesson/del')
  .get(isTeacher, async function (req, res) {
    return res.render('teacher/course-del.hbs', {
      title: 'Own Sourse',
      page: 'teacher',
    })
  })
  .post(isTeacher, async function (req, res) {
    return res.redirect('/own-course')
  })

module.exports = router;