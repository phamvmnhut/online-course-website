const db = require('../utils/db');
const debug = require('debug')('app:user>model');
const TBL_USERS = 'User';

const catchErrorDB = function(fn) {
  try {
    return fn();
  } catch (error) {
    debug(error.message)
    return false;
  }
}

module.exports = {
  async all() {
    try {
      return db.load(`select * from ${TBL_USERS}`);
    } catch (error){
      debug(error.message)
      return null;
    }
  },

  async single(UserID) {
    try {
      const rows = await db.load(`select * from ${TBL_USERS} where UserID = ${UserID}`);
      if (rows.length === 0) return null;
      return rows[0];
    } catch (error){
      debug(error.message)
      return false
    }
  },

  async singleByEmail(email) {
    try {
      const rows = await db.load(`select * from ${TBL_USERS} where Email = '${email}'`);
      if (rows.length === 0) return null;
      return rows[0];
    } catch (error){
      debug(error.message)
      return false;
    }
  },
    

  async patch(entity) {
    try {
      const condition = { UserID: entity.UserID };
      const UserID = entity.UserID;
      delete entity.UserID;
      await db.patch(entity, condition, TBL_USERS);
      const user = await db.get(condition, TBL_USERS)
      return user[0];
    } catch (error){
      debug(error.message)
      return false;
    }
  },

  async add(entity) { catchErrorDB(async ()=> {
    await db.add(entity, TBL_USERS);
    const condition = {Email: entity.Email};
    const newUser = await db.get(condition, TBL_USERS)
    return newUser[0]
  })},
  
  async del(userId) {
      try {
        await db.del({UserID}, TBL_USERS);
        return true
      } catch (error){
        debug(error.message)
        return false;
      }
  }
};
