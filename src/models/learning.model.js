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
  const CourseID = entity.CourseID;
  const StudentID = entity.StudentID;
  const LessonFirst = await LessonModel.getByCourseID(CourseID);
  await db.add({ CourseID, StudentID, Section: LessonFirst[0].Section, State: 0 }, TBL_LER);
  const res =  await db.get2Condition({ CourseID }, { StudentID }, TBL_LER);
  return res[0];
}, debug);

module.exports = {

  getOne: db.catchErrorDB(async function (entity) {
    const CourseID = entity.CourseID;
    const StudentID = entity.StudentID;
    const rows = await db.get2Condition({ CourseID }, { StudentID }, TBL_LER);
    if (rows.length === 0) {
      return await add({CourseID, StudentID})
    }
    return rows[0];
  }, debug),

  add,

  patch: db.catchErrorDB(async function (entity) {
    const CourseID = entity.CourseID;
    const StudentID = entity.StudentID;
    await db.load(`UPDATE ${TBL_LER} SET Section=${Section} WHERE CourseID=${CourseID} AND StudentID=${StudentID}`)
    const res = await db.get2Condition({ CourseID }, { StudentID }, TBL_LER);
    return res[0];
  }, debug),
};
