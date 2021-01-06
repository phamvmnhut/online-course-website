// require all Route
const indexRoute = require('./index.route.js');
const adminRoute = require('./admin.route');
module.exports = function (app) {
  app.use('/', indexRoute);
  app.use('/admin', adminRoute);
}
