const db = require('../utils/db');
const debug = require('debug')('app:user>model');

const TBL_USERS = 'User';

/**User role
* 0: student
* 1: teacher
* 2: admin
 */

/**
 * User Delete
 * 1: Yes
 * 0: No
 */

module.exports = {
  getLastElement: db.catchErrorDB(async function () {
    return await db.load(`SELECT * FROM ${TBL_USERS} WHERE UserID = (SELECT MAX(UserID) FROM ${TBL_USERS})`);
  }, debug),

  all: db.catchErrorDB(async function () {
    return await db.get({ Delete: 0 }, TBL_USERS);
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

  addNewStudent : db.catchErrorDB(async function (entity) {
    const newUserTdo = {...entity, 
      Wallet: 0, 
      Role: 0,
      DateCreated: new Date(), 
      Activated: 0, 
      Delete: 0
    }
    await db.add(newUserTdo, TBL_USERS);
    const condition = { Email: entity.Email };
    const newUser = await db.get(condition, TBL_USERS)
    return newUser[0]
  }, debug),

  patch: db.catchErrorDB(async function (entity) {
    const condition = { UserID: entity.UserID };
    delete entity.UserID;
    var x = await db.patch(entity, condition, TBL_USERS);
    const user = await db.get(condition, TBL_USERS)
    return user[0];
  }, debug),

  patchActive: db.catchErrorDB(async function (UserID) {
    await db.patch({ Activated: 1 }, { UserID }, TBL_USERS);
    const user = await db.get({ UserID }, TBL_USERS)
    return user[0];
  }, debug),

  del: db.catchErrorDB(async function (UserID) {
    await db.patch({Delete: 1}, {UserID}, TBL_USERS)
    return true
  }, debug),

  allByRole: db.catchErrorDB(async function(role, limit, offset){
    var qr = (role == -1) ? '' : `where Role=${role}`
    return db.load(`select * from User ${qr} order by UserID limit ${limit} offset ${offset};`)
  }, debug),

  totalUses: db.catchErrorDB(async function(role){
    var qr = (role == -1) ? '' : `where Role=${role}`
    const rows = await db.load(`select count(*) as total from User ${qr};`);
    if (rows && rows.length != 0) {
      return rows[0].total;
    }
    return 0;
  }, debug)
}
