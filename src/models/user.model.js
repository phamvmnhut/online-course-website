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

  add(entity) {return db.add(entity, TBL_USERS)},
};
