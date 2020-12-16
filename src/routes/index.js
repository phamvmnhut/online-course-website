// require all Route
const indexRoute = require('./index.route');

module.exports = function (app) {
  app.use('/', indexRoute);
}