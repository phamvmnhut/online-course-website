const db = require('../utils/db');
const debug = require('debug')('app:course>model');

const TBL_COU = 'Course';
const TBL_USER = 'User';
const TBL_RATE = 'CourseRating';
const TBL_PUR = 'Purchased';
const TBL_CAT = 'Category';

/** Couse State: 
 * 0: is Editing
 * 1: is Completed
 */
const getSingleByID = db.catchErrorDB( async function (CourseID) {
  const course = await db.load(`SELECT C.CourseID, C.CourseName, CAT.CategoryID, CAT.CategoryName, 
                                    T.DisplayName, T.UserID, C.Avatar, C.DateModified, 
                                      C.Price, C.Discount, C.ShortDescription, C.FullDescription,
                                      avg(CR.Point) as Point, count(CR.CourseID) as Count 
                                      FROM Course as C 
                                        left join ${TBL_USER} as T on C.TeacherID = T.UserID
                                        left join ${TBL_CAT} as CAT on C.CategoryID = CAT.CategoryID
                                        join ${TBL_RATE} as CR on C.CourseID = CR.CourseID
                                          where C.CourseID = ${CourseID} AND C.State = 1
                                            group by C.CourseID`);
  if (course.length == 0) return null;
  return course[0];
}, debug);

const getLastElement = db.catchErrorDB(async function () {
  const row = await db.load(`SELECT * FROM ${TBL_CAT} WHERE CourseID = (SELECT MAX(CourseID) FROM ${TBL_COU})`);
  if (row.length === 0) return null;
  return row[0];
}, debug);


module.exports = {
  getLastElement,

  all: db.catchErrorDB(async function () {
    return await db.getNoCondition(TBL_COU);
  }, debug),
  allEditing: db.catchErrorDB(async function () {
    const rows = await db.get( {State : 0},TBL_COU);
    courses = []
    for (const e of rows) {
      const course = await getSingleByID(e.CourseID);
      if (course) {courses.push(course);}
    }
    return courses;
  }, debug),
  allCompleted: db.catchErrorDB(async function () {
    const rows = await db.get( {State : 1},TBL_COU);
    courses = []
    for (const e of rows) {
      const course = await getSingleByID(e.CourseID);
      if (course) {courses.push(course);}
    }
    return courses;
  }, debug),

  getByTeacherID: db.catchErrorDB(async function (TeacherID) {
    const rows = await db.load(`select * from ${TBL_COU} WHERE TeacherID = ${TeacherID}`);
    courses = []
    for (const e of rows) {
      const course = await getSingleByID(e.CourseID);
      if (course) {courses.push(course);}
    }
    return courses;
  }, debug),

  getByCate: db.catchErrorDB(async function (CategoryID) {
    const rows = await db.load(`select * from ${TBL_COU} WHERE CategoryID = ${CategoryID}`);
    courses = []
    for (const e of rows) {
      const course = await getSingleByID(e.CourseID);
      if (course) {courses.push(course);}
    }
    return courses;
  }, debug),
    
  getSingleByID,

  getSoleInfo: db.catchErrorDB(async function (CourseID, UserID) {
    const rare_info = await db.load(`select count(*) as count from ${TBL_PUR} where CourseID = ${CourseID}`);
    const isSole = await db.load(`select count(*) as count from ${TBL_PUR} where CourseID = ${CourseID} and StudentID = ${UserID}`);
    return {
      ...rare_info[0],
      'isSole': isSole[0].count == 1
    }
  }, debug),
  getRates: db.catchErrorDB(async function (CourseID) {
    return db.load(`select r.CourseRatingID, r.StudentID, r.Point, r.Feedback, U.DisplayName  
      from CourseRating as r left join User as U on U.UserID = r.StudentID where r.CourseID = ${CourseID}`);
  }, debug),

  add: db.catchErrorDB(async function (entity) {
    await db.add(entity, TBL_COU);
    return await getLastElement();
  }, debug),
  path: db.catchErrorDB(async function (entity) {
    const condition = { CourseID: entity.CourseID };
    delete entity.CourseID;
    await db.patch(entity, condition, TBL_COU);
    return await db.get(condition, TBL_COU);
  }, debug),
  del: db.catchErrorDB(async function (entity) {
    return await db.del({ CourseID }, TBL_COU);
  }, debug),
};
