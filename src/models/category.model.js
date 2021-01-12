const db = require('../utils/db');
const debug = require('debug')('app:category>model');

const TBL_CAT = 'Category';
const TBL_FIELD = 'Field';

module.exports = {
  getLastElement: db.catchErrorDB(async function () {
    const row = await db.load(`SELECT * FROM ${TBL_CAT} WHERE CategoryID = (SELECT MAX(CategoryID) FROM ${TBL_CAT})`);
    if (row.length === 0) return null;
    return row[0];
  }, debug),

  all: db.catchErrorDB(async function () {
    const cates = await db.getNoCondition(TBL_CAT)
    cates.push({ CategoryID: 0, CategoryName: "All", CategoryDescription: "All category" });
    return cates;
  }, debug),

  async withField() {
    try {
      fieldwithcate = []
      fields = await db.getNoCondition(TBL_FIELD);
      fields.push({ FieldID: 0, FieldName: "General", FieldDescription: "General" })

      for (let i = 0; i < fields.length; i++) {
        categorys = await db.get({ FieldID: fields[i].FieldID }, TBL_CAT);
        fieldwithcate.push({ ...fields[i], categorys })
      }
      let lastItem = fieldwithcate.pop();
      lastItem.categorys.push({ CategoryID: 0, CategoryName: "All", CategoryDescription: "" })
      fieldwithcate.push(lastItem);
      return fieldwithcate;
    }
    catch (err) {
      debug(err.message)
      return [{
        FIeldID: 0, Name: "General", FIeldIDescription: "General",
        categorys: [{ CategoryID: 0, Name: "All", CategoryDescription: "" }]
      }];
    }
  },

  add: db.catchErrorDB(async function (entity) {
    await db.add(entity, TBL_CAT);
    return await this.getLastElement();
  }, debug),
  path: db.catchErrorDB(async function (entity) {
    const condition = { CategoryID: entity.CategoryID };
    delete entity.CategoryID;
    await db.patch(entity, condition, TBL_CAT);
    const rows = await db.get(condition, TBL_CAT);
    return rows[0];
  }, debug),
  del: db.catchErrorDB(async function (entity) {
    await db.del({ CategoryID }, TBL_CAT);
    return true;
  }, debug),

  allField: db.catchErrorDB(async function () {
    return await db.getNoCondition(TBL_FIELD);
  }, debug),

  addField: db.catchErrorDB(async function (entity) {
    await db.add(entity, TBL_FIELD);
    return await this.getLastElement();
  }, debug),
  pathField: db.catchErrorDB(async function (entity) {
    const condition = { FieldID: entity.FieldID };
    delete entity.FieldID;
    await db.patch(entity, condition, TBL_FIELD);
    const rows = await db.get(condition, TBL_FIELD);
    return rows[0];
  }, debug),
  delField: db.catchErrorDB(async function (entity) {
    await db.del({ FieldID }, TBL_FIELD);
    return true;
  }, debug),
};
