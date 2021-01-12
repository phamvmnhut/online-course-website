const db = require('../utils/db');
const debug = require('debug')('app:category>model');

const TBL_CAT = 'Category';
const TBL_FIELD = 'Field';

module.exports = {
  async all() {
    try {
      const cates = await db.getNoCondition(TBL_CAT)
      cates.push({ categoryID: 0, Name: "All", Description: "All category" });
      return cates;
    } catch (error) {
      debug(error.message)
      return false
    }
  },
  async withField() {
    try {
      fieldwithcate = []
      fields = await db.getNoCondition(TBL_FIELD);
      fields.push({FieldID: 0, FieldName: "General", FieldDescription: "General"})
      
      for (let i = 0; i< fields.length; i++) {
        categorys = await db.get({FieldID: fields[i].FieldID}, TBL_CAT);
        fieldwithcate.push({ ...fields[i], categorys})
      }
      let lastItem = fieldwithcate.pop();
      lastItem.categorys.push({CategoryID:0, CategoryName: "All", CategoryDescription: ""})
      fieldwithcate.push(lastItem);
      return fieldwithcate;
    }
    catch (err){
      debug(err.message)
      return [{FIeldID: 0, Name: "General", FIeldIDescription: "General", 
        categorys: [{CategoryID:0,Name: "All", CategoryDescription: ""}]}];
    }
  },

  async add(entity) {
    try {
      return await db.add(entity, TBL_CAT);
    }
    catch (err){
      debug(err.message)
      return false;
    }
  },
  async del(entity) {
    try {
      const condition = { CategoryID: entity.CategoryID};
      return await db.del(condition, TBL_CAT);
    } catch (err){
      debug(err.message)
      return false;
    }
  },
  patch(entity) {
    const condition = { ID: entity.ID };
    delete entity.ID;
    return db.patch(entity, condition, TBL_CAT);
  },

  addField(entity) {return db.add(entity, TBL_FIELD)},
  delField(entity) {
    const condition = { FieldID: entity.FieldID };
    return db.del(condition, TBL_FIELD);
  },
  patchField(entity) {
    const condition = { FieldID: entity.FieldID };
    delete entity.ID;
    return db.patch(entity, condition, TBL_FIELD);
  }
};
