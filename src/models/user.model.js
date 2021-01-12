const db = require('../utils/db');
const debug = require('debug')('app:user>model');

const TBL_USERS = 'User';

module.exports = {
  getLastElement: db.catchErrorDB(async function () {
    return await db.load(`SELECT * FROM ${TBL_USERS} WHERE UserID = (SELECT MAX(UserID) FROM ${TBL_USERS})`);
  }, debug),

  all : db.catchErrorDB(async function () {
    return await db.getNoCondition(TBL_USERS);
  }, debug),

  single: db.catchErrorDB(async function (UserID) {
    const rows = await db.get({ UserID }, TBL_USERS)
    if (rows.length === 0) return null;
    return rows[0];
  }, debug),

  singleByEmail: db.catchErrorDB(async function (Email) {
    const rows = await db.get({ Email }, TBL_USERS)
    if (rows.length === 0) return null;
    return rows[0];
  }, debug),
    
  add : db.catchErrorDB(async function (entity) {
    await db.add(entity, TBL_USERS);
    const condition = { Email: entity.Email };
    const newUser = await db.get(condition, TBL_USERS)
    return newUser[0]
  }, debug),

  patch: db.catchErrorDB(async function (entity) {
    const condition = { UserID: entity.UserID };
    delete entity.UserID;
    await db.patch(entity, condition, TBL_USERS);
    const user = await db.get(condition, TBL_USERS)
    return user[0];
  }, debug),

  del: db.catchErrorDB(async function (UserID) {
    await db.del({ UserID }, TBL_USERS);
    return true
  }, debug),
}
