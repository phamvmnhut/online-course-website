const db = require('../utils/db');
const debug = require('debug')('app:purchase>model');

const TBL_PUR = 'Purchased';
const TBL_WIS = 'Favorite';
const TBL_COU_RAT = 'CourseRating';

const getLastElement = db.catchErrorDB(async function () {
  const row = await db.load(`SELECT * FROM ${TBL_PUR} WHERE DatePurchased = (SELECT MAX(DatePurchased) FROM ${TBL_PUR})`);
  if (row.length === 0) return null;
  return row[0];
}, debug);

const checkStudentRegisted = db.catchErrorDB(async function(StudentID, CourseID) {
  const rows = await db.get2Condition({StudentID}, {CourseID}, TBL_PUR);
  if (rows.length == 0 ) return false;
  return rows[0]
}, debug);

module.exports = {
  all: db.catchErrorDB(async function() {
    return await db.getNoCondition(TBL_PUR);
  }, debug),
  allWish: db.catchErrorDB(async function() {
    return await db.getNoCondition(TBL_WIS);
  }, debug),

  getByStudentID: db.catchErrorDB(async function(StudentID) {
    return await db.get({StudentID},TBL_PUR);
  }, debug),
  getWishByStudentID: db.catchErrorDB(async function(StudentID) {
    return await db.get({StudentID}, TBL_WIS);
  }, debug),

  checkStudentRegisted,

  add: db.catchErrorDB(async function (entity) {
    await db.add({...entity,
      DatePurchased: new Date(),
      LessonCur: 0,
      State: 0,
      isCompleted: 0
    }, TBL_PUR);
    return await getLastElement();
  }, debug),

  addWish: db.catchErrorDB(async function (entity) {
    await db.add(entity, TBL_WIS);
    return await getLastElement();
  }, debug),

  delWish : db.catchErrorDB( async function (entity){
    await db.load(`DELETE FROM ${TBL_WIS} WHERE StudentID = ${entity.StudentID} and CourseID = ${entity.CourseID}`);
    return true
  }, debug),
  
  patch: db.catchErrorDB(async function (entity) {
    const CourseID = entity.CourseID
    const StudentID = entity.StudentID;
    delete entity.CourseID;
    delete entity.StudentID;
    await db.pool_query(`UPDATE ${TBL_PUR} SET ? WHERE ? AND ? `, [entity, { CourseID }, { StudentID }])
    return await checkStudentRegisted(StudentID, CourseID);
  }, debug),

  getLastElement,

  checkHad: db.catchErrorDB( async function(CourseID, StudentID) {
    const rows = await db.get2Condition({StudentID}, {CourseID}, TBL_COU_RAT);
    if (rows.length == 0 ) return false;
    return rows[0]
  }, debug),
  addFeedback: db.catchErrorDB(async function(entity) {
    return db.add(entity, TBL_COU_RAT);
  }),
};
