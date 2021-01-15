const db = require('../utils/db');
const debug = require('debug')('app:learning>model');

const TBL_COU = 'Course';
const TBL_USER = 'User';
const TBL_RATE = 'CourseRating';
const TBL_PUR = 'Purchased';
const TBL_CAT = 'Category';
const TBL_LES = 'Lesson';
const TBL_LER = 'Learning';

const LessonModel = require('./lesson.model');

const add = db.catchErrorDB(async function (entity) {
  await db.add({ ...entity, State: 0 }, TBL_LER);
  const res =  await db.pool_query(`SELECT * FROM ${TBL_LER} WHERE ? AND ? AND ?`, [{CourseID}, {StudentID}, {Section}])
  return res[0];
}, debug);

const getOne = db.catchErrorDB(async function (entity) {
  const CourseID = entity.CourseID;
  const StudentID = entity.StudentID;
  const Section = entity.Section;
  const rows = await db.pool_query(`SELECT * FROM ${TBL_LER} WHERE ? AND ? AND ?`, [{CourseID}, {StudentID}, {Section}])
  if (rows.length === 0) {
    return await db.add({CourseID, StudentID, Section, State: 0}, TBL_LER)
  }
  return rows[0];
}, debug);

module.exports = {

  getOne,
  add,

  patch: db.catchErrorDB(async function (entity) {
    const CourseID = entity.CourseID;
    const StudentID = entity.StudentID;
    const Section = entity.Section
    const State = entity.State;
    await db.pool_query(`UPDATE ${TBL_LER} SET ? WHERE ? AND ? AND ?`, [{State}, {CourseID}, {StudentID}, {Section}])
    return await getOne(entity)
  }, debug),

};
