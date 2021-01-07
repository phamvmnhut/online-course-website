const db = require('../utils/db');

const TBL_PUR = 'Purchased';
const TBL_WIS = 'Favorite';

module.exports = {
  all() {return db.load(`select * from ${TBL_PUR}`)},
  allWish() { return db.load(`select * from ${TBL_WIS}`) },

  getByStudentID(ID) {
    return db.load(`SELECT * FROM ${TBL_PUR} where StudentID = ${ID}`)
  },
  getWishByStudentID(ID) {
    return db.load(`SELECT * FROM ${TBL_WIS} where StudentID = ${ID}`)
  },

  add(entity) {return db.add({...entity, DatePurchased: new Date()} , TBL_PUR)},
  addWish(entity) {return db.add(entity, TBL_WIS)},

  del(entity) {
    const condition = { ID: entity.ID };
    return db.del(condition, TBL_PUR);
  },
  delWish(entity) {
    return db.load(`DELETE FROM ${TBL_WIS} WHERE StudentID = ${entity.StudentID} and CourseID = ${entity.CourseID}`);
  },
  
  patch(entity) {
    const condition = { ID: entity.ID };
    delete entity.ID;
    return db.patch(entity, condition, TBL_PUR);
  },
};
