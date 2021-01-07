const db = require('../utils/db');

const TBL_USERS = 'User';

module.exports = {
  all() {return db.load(`select * from ${TBL_USERS}`)},

  async single(id) {
    const rows = await db.load(`select * from ${TBL_USERS} where id = ${id}`);
    if (rows.length === 0) return null;
    return rows[0];
  },

  async singleByEmail(email) {
    const rows = await db.load(`select * from ${TBL_USERS} where email = '${email}'`);
    if (rows.length === 0) return null;
    return rows[0];
  },

  async patch(entity) {
    try {
      const condition = { ID: entity.ID };
      const ID = entity.ID;
      delete entity.ID;
      await db.patch(entity, condition, TBL_USERS);
      const rows = await db.load(`select * from ${TBL_USERS} where id = ${ID}`);
      return rows[0];
    }
    catch {
      return false;
    }
  },

  async add(entity) {
    try {
      await db.add(entity, TBL_USERS);
      const newUser = await db.load(`select * from ${TBL_USERS} where Email = '${entity.Email}'`);
      return newUser[0]
    } catch {
      return false;
    }
  },
  async del(ID) {
      try {
        await db.del({ID}, TBL_USERS);
        return true
      }
      catch {
        return false;
      }
  }
};
