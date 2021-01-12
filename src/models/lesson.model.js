const db = require('../utils/db');
const debug = require('debug')('app:lesstion>model');

const TBL_COU = 'Course';
const TBL_USER = 'User';
const TBL_RATE = 'CourseRating';
const TBL_PUR = 'Purchased';
const TBL_CAT = 'Category';
const TBL_LES = 'Lesson';

/** Couse State: 
 * 0: is Editing
 * 1: is Completed
 */
const getSingleByID = db.catchErrorDB( async function (CourseID) {
  const course = await db.load(`SELECT C.CourseID, C.CourseName, CAT.CategoryID, CAT.CategoryName, 
                                    T.DisplayName, T.UserID, C.Avatar, C.DateModified, C.State,
                                      C.Price, C.Discount, C.ShortDescription, C.FullDescription,
                                      avg(CR.Point) as Point, count(CR.CourseID) as Count 
                                      FROM Course as C 
                                        left join ${TBL_USER} as T on C.TeacherID = T.UserID
                                        left join ${TBL_CAT} as CAT on C.CategoryID = CAT.CategoryID
                                        left join ${TBL_RATE} as CR on C.CourseID = CR.CourseID
                                          where C.CourseID = ${CourseID}
                                            group by C.CourseID`);
  if (course.length == 0) return null;
  return course[0];
}, debug);

const getLastElement = db.catchErrorDB(async function () {
  const row = await db.load(`SELECT * FROM ${TBL_COU} WHERE CourseID = (SELECT MAX(CourseID) FROM ${TBL_COU})`);
  if (row.length === 0) return null;
  return row[0];
}, debug);


module.exports = {
  getLastElement,

  getBySection: db.catchErrorDB(async function (Section) {
    return await db.get({ Section }, TBL_LES);
  }, debug),
    
  getByCourseID: db.catchErrorDB(async function (CourseID) {
    return await db.get({ CourseID }, TBL_LES);
  }, debug),

  getSingleByID,

  add: db.catchErrorDB(async function (entity) {
    await db.add(entity, TBL_LES);
    return await getLastElement();
  }, debug),
  patch: db.catchErrorDB(async function (entity) {
    const condition = { Section: entity.Section };
    delete entity.Section;
    await db.patch(entity, condition, TBL_LES);
    return await db.get(condition, TBL_LES);
  }, debug),
  del: db.catchErrorDB(async function (Section) {
    return await db.del({ Section }, TBL_LES);
  }, debug),
};
