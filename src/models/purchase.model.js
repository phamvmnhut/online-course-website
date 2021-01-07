const db = require('../utils/db');

const TBL_PUR = 'Purchased';

module.exports = {
  all() {return db.load(`select * from ${TBL_PUR}`)},
  // async withField() {
  //   try {
  //     fieldwithcate = []
  //     fields = await db.load(`select * from ${TBL_FILED}`);
  //     fields.push({ID: 0, Name: "General", Description: "General"})
      
  //     for (let i = 0; i< fields.length; i++) {
  //       categorys = await db.load(`select * from ${TBL_CAT} where FieldID = ${fields[i].ID}`)
  //       fieldwithcate.push({ ...fields[i], categorys})
  //     }
  //     let lastItem = fieldwithcate.pop();
  //     lastItem.categorys.push({ID:0,Name: "All", Description: ""})
  //     fieldwithcate.push(lastItem);
  //     return fieldwithcate;
  //   }
  //   catch (err){
  //     console.log(err)
  //     return [{ID: 0, Name: "General", Description: "General", 
  //       categorys: [{ID:0,Name: "All", Description: ""}]}];
  //   }
  // },
  getByStudentID(ID) {
    return db.load(`SELECT * FROM ${TBL_PUR} where StudentID = ${ID}`)
  },

  add(entity) {return db.add({...entity, DatePurchased: new Date()} , TBL_PUR)},
  del(entity) {
    const condition = { ID: entity.ID };
    return db.del(condition, TBL_PUR);
  },
  patch(entity) {
    const condition = { ID: entity.ID };
    delete entity.ID;
    return db.patch(entity, condition, TBL_PUR);
  },
};
