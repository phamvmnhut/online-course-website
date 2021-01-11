const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST ? process.env.DATABASE_HOST : 'localhost',
  port: process.env.DATABASE_PORT ? process.env.DATABASE_PORT : 3306,
  user: process.env.DATABASE_USER ? process.env.DATABASE_USER : 'root',
  password: process.env.DATABASE_PASS ? process.env.DATABASE_PASS : 'root',
  database: process.env.DATABASE_NAME ? process.env.DATABASE_NAME : 'course',
  connectionLimit: 50,
});

const pool_query = util.promisify(pool.query).bind(pool);

module.exports = {
  pool_query,
  load: sql => pool_query(sql),
  getNoCondition: (tableName) => pool_query(`SELECT * from ${tableName}`),
  get: (condition, tableName) => pool_query(`SELECT * from ${tableName} WHERE ?`, condition),
  getLast: (tableName) => pool_query(`SELECT * from ${tableName}`),
  add: (entity, tableName) => pool_query(`INSERT INTO ${tableName} SET ?`, entity),
  del: (condition, tableName) => pool_query(`DELETE FROM ${tableName} WHERE ?`, condition),
  patch: (entity, condition, tableName) => pool_query(`UPDATE ${tableName} SET ? WHERE ?`, [entity, condition])
};
