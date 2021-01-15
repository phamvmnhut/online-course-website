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
                                    T.DisplayName,C.TeacherID, C.Avatar, C.DateModified, C.State,
                                      C.Price, C.Discount, C.ShortDescription, C.FullDescription, C.Viewed,
                                      avg(CR.Point) as Point, count(CR.CourseID) as Count 
                                      FROM ${TBL_COU} as C 
                                        left join ${TBL_USER} as T on C.TeacherID = T.UserID
                                        left join ${TBL_CAT} as CAT on C.CategoryID = CAT.CategoryID
                                        left join ${TBL_RATE} as CR on C.CourseID = CR.CourseID
                                          where C.CourseID = ${CourseID} AND C.Deleted = 0
                                            group by C.CourseID`);
  if (course.length == 0) return null;
  return course[0];
}, debug);

const getLastElement = db.catchErrorDB(async function () {
  const row = await db.load(`SELECT * FROM ${TBL_COU} WHERE CourseID = (SELECT MAX(CourseID) FROM ${TBL_COU})`);
  if (row.length === 0) return null;
  return row[0];
}, debug);

function totalStudentsFilterQuery(min, max){
  var result = '';

  if (min || max) {
      totalQuery = `select Course.CourseID
                    from Course left join
                    (select Purchased.CourseID, count(*) as total from Purchased group by Purchased.CourseID) as PC
                    on Course.CourseID = PC.CourseID`;
      minQuery = '';
      maxQuery = '';
      if (min) {
          minQuery = ` ifnull(PC.total, 0) > ${(+min) - 1} `;
      }
      if (max) {
          maxQuery = ` ifnull(PC.total, 0) < ${(+max) + 1} `
      }
      if (min && max) {
        result = ` and Course.CourseID in (${totalQuery} where ${minQuery} and ${maxQuery}) `;
      } else {
        result = ` and Course.CourseID in (${totalQuery} where ${minQuery} ${maxQuery}) `;
      }
  }
  return result;
}

function keyFilterQuery(key){
  return (!key) ? '' : ` and match (Course.CourseName, Course.ShortDescription, Course.FullDescription) against (\'${key}\') `;
}

function categoryFilterQuery(category){
  return (!(category && category != -1)) ? '' : ` and Course.CategoryID = ${category} `;
}

function priceFilterQuery(min, max){
  var priceFilter = '';
  if (min) {
      priceFilter += ` and Course.Price > ${(+min) - 1} `;
  }
  if (max) {
      priceFilter += ` and Course.Price < ${(+max) + 1} `;
  }
  return priceFilter;
}

const deleteIfExistsCourseView = db.catchErrorDB(async function(){
  const deleteQuery = 'drop view if exists CourseView;'
  const result = await db.load(deleteQuery);
  return result;
}, debug)

const loadCourseView = db.catchErrorDB(async function(filter){
  const totalStudentsFilter = totalStudentsFilterQuery(filter.no_min, filter.no_max)
  const keyFilter = keyFilterQuery(filter.key);
  const catFilter = categoryFilterQuery(filter.cat);
  const priceFilter = priceFilterQuery(filter.w_min, filter.w_max);

  const createViewQuery = `
  create view CourseView as
  select Course.CourseID, Course.CourseName, User.DisplayName as TeacherName, Category.CategoryName,
  Course.DateModified, Course.Price, Course.Avatar
  from (Course left join User on Course.TeacherID = User.UserID)
  left join Category on Course.CategoryID = Category.CategoryID
  where Course.Deleted = 0 
  ${catFilter}
  ${priceFilter}
  ${totalStudentsFilter}
  ${keyFilter};`;

  await deleteIfExistsCourseView();
  const result = await db.load(createViewQuery);
  return result;
}, debug)

const getTotalCoursesInView = db.catchErrorDB(async function(){
  const query = 'select count(*) as total from CourseView;'
  const rows = await db.load(query);
  if (rows && rows.length != 0) {
    return rows[0].total;
  } 
  return 0;
}, debug)

const getCoursesFromView = db.catchErrorDB(async function(limit, offset){
  const query = `select * from CourseView
  order by CourseView.CourseID 
  limit ${limit || 0}
  offset ${offset || 0}`;

  return await db.load(query);
}, debug)


module.exports = {
  getLastElement,

  all: db.catchErrorDB(async function () {
    return await db.get({Deleted: 0},TBL_COU);
  }, debug),
  allEditing: db.catchErrorDB(async function () {
    const rows = await db.get2Condition( {State : 0}, {Deleted: 0},TBL_COU);
    courses = []
    for (const e of rows) {
      const course = await getSingleByID(e.CourseID);
      if (course) {courses.push(course);}
    }
    return courses;
  }, debug),
  allCompleted: db.catchErrorDB(async function () {
    const rows = await db.get2Condition( {State : 1}, {Deleted: 0}, TBL_COU);
    courses = []
    for (const e of rows) {
      const course = await getSingleByID(e.CourseID);
      if (course) {courses.push(course);}
    }
    return courses;
  }, debug),

  getByTeacherID: db.catchErrorDB(async function (TeacherID) {
    const rows = await db.get2Condition({TeacherID}, {Deleted: 0}, TBL_COU)
    courses = []
    for (const e of rows) {
      const course = await getSingleByID(e.CourseID);
      if (course) {courses.push(course);}
    }
    return courses;
  }, debug),

  getByCate: db.catchErrorDB(async function (CategoryID) {
    const rows = await db.load(`select * from ${TBL_COU} WHERE CategoryID = ${CategoryID} AND State = 1 AND Deleted = 0`);
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
      'isSole': isSole[0].count == 1,
      rate: isSole[0]
    }
  }, debug),
  getRates: db.catchErrorDB(async function (CourseID) {
    return db.load(`select r.CourseRatingID, r.StudentID, r.Point, r.Feedback, U.DisplayName  
      from CourseRating as r left join User as U on U.UserID = r.StudentID where r.CourseID = ${CourseID}`);
  }, debug),

  getEditerChoose: db.catchErrorDB(async function () {
    const rows = [
      {CourseID: 1},
      {CourseID: 2},
      {CourseID: 3},
      {CourseID: 4},
      {CourseID: 5},
      {CourseID: 6}
    ]
    courses = []
    for (const e of rows) {
      const course = await getSingleByID(e.CourseID);
      if (course) {courses.push(course);}
    }
    return courses;
  }, debug),
  getLatestByTime: db.catchErrorDB(async function () {
    const rows = await db.load(`SELECT *, UNIX_TIMESTAMP(DateModified) AS DATE
                                              FROM ${TBL_COU}
                                              WHERE State = 1
                                              ORDER BY DATE DESC
                                              LIMIT 3;`)
    courses = []
    for (const e of rows) {
      const course = await getSingleByID(e.CourseID);
      if (course) {courses.push(course);}
    }
    return courses;
  }, debug),
  getTopPurchase: db.catchErrorDB(async function () {
    const rows = await db.load(`SELECT CourseID, count(*) as SL FROM ${TBL_PUR} 
                                          group by CourseID 
                                          order by SL 
                                          limit 3;`)
    courses = []
    for (const e of rows) {
      const course = await getSingleByID(e.CourseID);
      if (course) {courses.push(course);}
    }
    return courses;
  }, debug),

  add: db.catchErrorDB(async function (entity) {
    entity = {
      ...entity,
      DateModified: new Date(),
      Discount: 0,
      State: 0,
      Viewed: 0
    }
    await db.add(entity, TBL_COU);
    return await getLastElement();
  }, debug),
  path: db.catchErrorDB(async function (entity) {
    const condition = { CourseID: entity.CourseID };
    delete entity.CourseID;
    entity = {
      ...entity,
      DateModified: new Date(),
    }
    await db.patch(entity, condition, TBL_COU);
    return await db.get(condition, TBL_COU);
  }, debug),

  patchIncView: db.catchErrorDB(async function (CourseID) {
    const course = await db.get({CourseID}, TBL_COU);
    if (!course || course.length == 0) return false;
    await db.patch({Viewed: parseInt(course.Viewed) + 1}, {CourseID}, TBL_COU);
    return true
  }, debug),

  del: db.catchErrorDB(async function (CourseID) {
    const condition = { CourseID };
    await db.patch({Deleted: 1, DateModified: new Date()}, condition, TBL_COU);
    return true
  }, debug),

  deleteIfExistsCourseView,
  loadCourseView,
  getTotalCoursesInView,
  getCoursesFromView,

};
