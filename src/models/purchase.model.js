const db = require('../utils/db');
const debug = require('debug')('app:purchase>model');

const TBL_PUR = 'Purchased';
const TBL_WIS = 'Favorite';

const getLastElement = db.catchErrorDB(async function () {
  const row = await db.load(`SELECT * FROM ${TBL_PUR} WHERE DatePurchased = (SELECT MAX(DatePurchased) FROM ${TBL_PUR})`);
  if (row.length === 0) return null;
  return row[0];
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
    return await db.get({StudentID},TBL_WIS);
  }, debug),

  checkStudentRegisted: db.catchErrorDB(async function(StudentID, CourseID) {
    const rows = await db.get2Condition({StudentID}, {CourseID},TBL_PUR);
    return rows.length > 0;
  }, debug),

  add: db.catchErrorDB( async function(entity) {
    await db.add({ ...entity, 'DatePurchased': new Date() }, TBL_PUR);
    return await getLastElement();
  }, debug),
  addWish: db.catchErrorDB(async function (entity) {
    await db.add(entity, TBL_WIS);
    return await getLastElement();
  }, debug),

  delWish(entity) {
    return db.load(`DELETE FROM ${TBL_WIS} WHERE StudentID = ${entity.StudentID} and CourseID = ${entity.CourseID}`);
  },
  
  patch(entity) {
    const condition = { ID: entity.ID };
    delete entity.ID;
    return db.patch(entity, condition, TBL_PUR);
  },
  getLastElement
};
