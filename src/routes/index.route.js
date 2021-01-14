const express = require('express');
const debug = require('debug')('app:home');
const bcrypt = require('bcryptjs');

const { validateEmail } = require('../utils/validate');

const { UserModel, CategoryModel, CourseModel, PurchaseModel, LessonModel, LearningModel} = require('../models');

const { isAuth, isTeacher } = require('../middleware/auth');

const { uploadImg, uploadVid, uploadAva } = require('../utils/upload');

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
const isStudentRegisted = async function (req, res, next){
  const StudentID = req.session.authUser.UserID;
  const CourseID = await req.params.CourseID
  const course = await CourseModel.getSingleByID(CourseID);
  if (!course) {
    req.flash('Dont have this course')
    return res.redirect('/my-course');
  }
  const purchased = await PurchaseModel.checkStudentRegisted(StudentID, CourseID);
  if (!purchased) {
    req.flash('You dont have this course in purchased for do this action')
    return res.redirect('/my-course');
  }
  req.course = course;
  return next();
}

const router = express.Router();

// route for guest
router.get('/', async function (req, res) {
  const catewithfield = await CategoryModel.withField();
  
  const courseEditerChoose = await CourseModel.getEditerChoose();
  const courseLastedByTime = await CourseModel.getLatestByTime();
  const courseTopPurchased = await CourseModel.getTopPurchase();
  const allCourses = await CourseModel.allCompleted();
  return res.render('guest/home.hbs', {
    title: "Home",
    page: 'home',
    catewithfield,
    courseEditerChoose,
    courseLastedByTime,
    courseTopPurchased,
    allCourses
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
    // check active
    if (user.Activated == 0) {
      req.flash("error", "Please active this account");
      return res.redirect('/login')
    }
    // check password
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
  .post(uploadAva, async function (req, res, next) {
    const hash = bcrypt.hashSync(req.body.password, 10);
    if (!validateEmail(req.body.email)) {
      req.flash("error", "Fail to register user")
      return res.redirect('/resgister');
    }
    const user = {
      Avatar: req.file !== undefined ? req.file.filename : "avatar-1.jpg",
      Email: req.body.email,
      LastName: req.body.last_name,
      FirstName: req.body.first_name,
      Password: hash,
      DisplayName: req.body.display_name || "NoName",
    }
    const userNew = await UserModel.addNewStudent(user)
    if ( ! userNew){
      req.flash("error", "Fail to register user")
      return res.redirect('/register');
    }
    req.flash("success", "Register success, Please activate this accoutn, check email");
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
  debug("[course query] ", req.query)
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

router.get('/detail/:CourseID', async function (req, res) {
  let UserID = 0;
  let CourseID = Math.floor(Math.random() * Math.floor(10));
  if (req.session.isAuth) {UserID = req.session.authUser.UserID}
  if (req.params.CourseID !== undefined) CourseID = req.params.CourseID

  const course = await CourseModel.getSingleByID(CourseID);
  if (!course) {
    req.flash("noti", "Dont exit this course with this ID");
    return res.redirect('/');
  }
  
  await CourseModel.path({CourseID, Viewed: parseInt(course.Viewed) +1})
  
  const rates = await CourseModel.getRates(CourseID);
  const soleInfo = await CourseModel.getSoleInfo(CourseID, UserID);
  const lessons = await  LessonModel.getByCourseID(course.CourseID);
  const relatedCourse = await CourseModel.getByCate(course.CategoryID);

  return res.render('guest/course_details.hbs', {
    title: course.Name,
    page: 'course',
    course,
    rates,
    soleInfo,
    lessons,
    relatedCourse,
  })
})


router.route('/detail/(:CourseID)?/preview')
  .get(async function (req, res) {
    const CourseID = req.params.CourseID;
    // get learning position
    let lessons = await LessonModel.getByCourseID(CourseID);
    if (lessons.length == 0) {
      req.flash("This course dont have any Lesson")
      return res.render('guest/studying-preview.hbs', {
        title: 'Learning',
        page: 'student',
        isNotReadyToLearn: true
      })
    }

    // get more info
    const rates = await CourseModel.getRates(CourseID);
    const course = await CourseModel.getSingleByID(CourseID)
    lessons = lessons.map((e, i) => { if (i > 1) { return { ...e, Video: 'demo.mp4' } } else { return e } })
    const SectionCur = lessons[0]

    return res.render('guest/studying-preview.hbs', {
      title: 'Preview',
      page: 'home',
      lessons,
      rates,
      SectionCur,
      course
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
    debug('[req.body]', req.body)
    if (req.body.OldPassword == undefined) {
      req.flash("error", "Please enter your password");
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
    userUpdate = req.file !== undefined ? { ...userUpdate, Avatar: req.file.filename } : userUpdate;
    
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
    const UserID = req.session.authUser.UserID
    const CourseID = req.params.CourseID;
    const user = await UserModel.single(UserID);
    const course = await CourseModel.getSingleByID(CourseID);
    if (!course) {
      req.flash("noti", "Your course you wait is not exist");
      return res.redirect('/courses');
    }
    const balanse = user.Wallet - course.Price;

    const soleInfo = await CourseModel.getSoleInfo(CourseID, UserID);
    if (soleInfo.isSole) {
      req.flash('noti', "you readly have this course")
      return res.redirect(`/study/${CourseID}`)
    }

    return res.render('user/confirm.hbs', {
      title: course.Name,
      course,
      user,
      balanse,
      isOK: balanse >= 0,
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
    await UserModel.patch({ UserID, Wallet: balanse })
    const teacher = await UserModel.single(course.TeacherID);
    const addmoney = teacher.Wallet + course.Price;
    await UserModel.patch({ UserID: teacher.UserID, Wallet: addmoney })
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

router.route('/study/:CourseID/')
  .get(isAuth, isStudentRegisted, async function (req, res) {
  const CourseID = req.params.CourseID;
  const StudentID = req.session.authUser.UserID;
  // get learning position
  const Learning = await LearningModel.getOne({CourseID, StudentID});
  if (! Learning) {
    req.flash("This course dont have any Lesson")
    return res.render('user/studying.hbs', {
      title: 'Learning',
      page: 'student',
      isNotReadyToLearn: true,
    })
  }
  // render video
  const lessons = await  LessonModel.getByCourseID(CourseID);
  const SectionCur = lessons.filter(e => e.Section == Learning.Section)[0]
  // get more info
  const rates = await CourseModel.getRates(CourseID);
  const feedback = await PurchaseModel.checkHad(CourseID, StudentID)

  return res.render('user/studying.hbs', {
    title: 'Learning',
    page: 'student',
    lessons,
    SectionCur,
    rates,
    course: req.course,
    feedback
  })
})
  .post(isAuth, isStudentRegisted, async function (req, res) {
    // debug(req.body);
    const CourseID = req.params.CourseID;
    const StudentID = req.session.authUser.UserID;
    // change Section to learning continue
    if (req.body.Section !== undefined) {
      const Section = req.body.Section
      const updateLearning = await LearningModel.patch({ Section, CourseID, StudentID })
      return res.json({ status: updateLearning })
    }
    // add feedback
    if (req.body.CourseRatingID !== undefined) {
      if (req.body.CourseRatingID == 0) { //add fb
        delete req.body.CourseRatingID
        const newFeedbackTdo = { CourseID, StudentID, ...req.body }
        const addNewFeedback = await PurchaseModel.addFeedback(newFeedbackTdo)
        if (!addNewFeedback) {
          req.flash('warn', 'add new feedback fial')
        } else {
          req.flash('success', "add new feedback success")
        }
        return res.redirect(req.get('referer'))
      } else {
        // update feedback
      }
    }
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
  .post(isTeacher, uploadImg ,async function (req, res) {
    const TeacherID = req.session.authUser.UserID;
    delete req.body.image;
    const Avatar = req.file !== undefined ? req.file.filename : "product-5.jpg"
    const newCourse = await CourseModel.add({...req.body,Avatar, TeacherID})
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
      rates,
    })
  })
  .post(isTeacher, isTeacherOwnCourse, uploadImg, async function (req, res) {
    delete req.body.image;
    let updateCourse = { ...req.body, CourseID: req.course.CourseID, TeacherID: req.session.authUser.UserID };
    if (req.file !== undefined) {
      updateCourse = { ...updateCourse, Avatar: req.file.filename }
    }
    const updatedCourse = await CourseModel.path(updateCourse)
    if (!updatedCourse) {
      req.flash('error', "update fail Course")
      return res.redirect(req.get('referer'))
    }
    req.flash('success', "update success Course")
    return res.redirect(`/own-course/${req.course.CourseID}/edit`)
  })
router.route('/own-course/:CourseID/del')
  .get(isTeacher,isTeacherOwnCourse, async function (req, res) {
    return res.render('teacher/course-del.hbs', {
      title: 'Own Sourse',
      page: 'teacher',
    })
  })
  .post(isTeacher, isTeacherOwnCourse, async function (req, res) {
    const delCourse = await CourseModel.del(req.params.CourseID)
    if (!delCourse) {
      req.flash('error', "delete fail Course")
      return res.redirect(req.get('referer'))
    }
    req.flash('success', "deleted success Course")
    return res.redirect(`/own-course/${req.course.CourseID}/edit`)
  })

router.route('/own-course/:CourseID/lesson/add')
  .get(isTeacher, isTeacherOwnCourse, async function (req, res) {
    return res.render('teacher/lesson-add.hbs', {
      title: 'Own Sourse',
      page: 'teacher',
      course: req.course
    })
  })
  .post(isTeacher, isTeacherOwnCourse, uploadVid ,async function (req, res) {
    const CourseID = req.course.CourseID;
    delete req.body.video;
    let newLessonTdo = { ...req.body, CourseID }
    if (req.file !== undefined) {
      newLessonTdo = { ...newLessonTdo, Video: req.file.filename }
    }
    const newLesson = await LessonModel.add(newLessonTdo)
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
    if (!lesson) {
      req.flash('error', "Fail to load this Lesson")
      return res.redirect(`/own-course/${CourseID}/edit`)
    }
    return res.render('teacher/lesson-edit.hbs', {
      title: 'Own Sourse',
      page: 'teacher',
      course: req.course,
      lesson,
    })
  })
  .post(isTeacher, isTeacherOwnCourse, uploadVid, async function (req, res) {
    const Section = req.params.Section
    delete req.body.video;
    let updateLessonTdo = { ...req.body, Section }
    if (req.file !== undefined) {
      updateLessonTdo = { ...updateLessonTdo, Video: req.file.filename }
    }
    const updateLesson = await LessonModel.patch(updateLessonTdo)
    if (!updateLesson) {
      req.flash('error', 'Fail to add update lesson')
      return res.redirect(req.get('referer'))
    }
    req.flash('success', 'Success to update Lesson')
    return res.redirect(`/own-course/${req.course.CourseID}/edit`)
  })
router.route('/own-course/:CourseID/lesson/:Section/del')
  .get(isTeacher, isTeacherOwnCourse, async function (req, res) {
    return res.render('teacher/course-del.hbs', {
      title: 'Own Sourse',
      page: 'teacher',
    })
  })
  .post(isTeacher, isTeacherOwnCourse, async function (req, res) {
    const delLesson = await LessonModel.del(req.params.Section)
    if (!delLesson){
      req.flash('error', 'Delete Fail')
    }else {
      req.flash('success', 'Success to delete this content')
    }
    return res.redirect(`/own-course/${req.course.CourseID}/edit`)
  })

module.exports = router;