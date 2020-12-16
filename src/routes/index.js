// require all Route
const indexRoute = require('./index.route.js');

module.exports = function (app) {
  app.use('/', indexRoute);
}