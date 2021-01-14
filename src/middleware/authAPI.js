// role
// 0: student
// 1: teacher
// 2: admin
function isAuth(req, res, next) {
  if (req.session.isAuth === false) {
    req.session.retUrl = req.originalUrl;
    return res.redirect('/login');
  }
  return next();
}

function isTeacher(req, res, next) {
  if (req.session.isAuth === false) {
    req.session.retUrl = req.originalUrl;
    req.flash("warn", "You must login to do this action")
    return res.redirect('/login');
  }
  if (req.session.authUser.Role > 0){
    return next();
  }
  else {
    req.flash("warn", "You dont have permisson to do this action");
    return res.redirect('/');
  }
}

function isAdmin(req, res, next) {
  if (req.session.isAuth === false) {
    req.session.retUrl = req.originalUrl;
    req.flash("warn", "You must login to do this action")
    return res.redirect('/login');
  }
  if (req.session.authUser.Role > 1){
    return next();
  }
  else {
    req.flash("warn", "You dont have permisson to do this action");
    return res.redirect('/');
  }
}

module.exports = {
  isAuth,
  isTeacher,
  isAdmin
}