const jwt = require("jsonwebtoken");
/**
 * private function generateToken
 * @param data 
 */
let generateToken = (data) => {
  return new Promise((resolve, reject) => {
    console.log(data);
    jwt.sign(
      data,
      process.env.JWT_SECRET_KEY,
      {
        algorithm: "HS256",
        expiresIn: process.env.JWT_EXPIRES,
      },
      (error, token) => {
        if (error) {
          return reject(error);
        }
        return resolve(token);
    });
  });
}
/**
 * This module used for verify jwt token
 * @param {*} token 
 */
let verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token,  process.env.JWT_SECRET_KEY, (error, decoded) => {
      if (error) {
        return reject(error);
      }
      return resolve(decoded);
    });
  });
}
module.exports = {
  generateToken,
  verifyToken
};