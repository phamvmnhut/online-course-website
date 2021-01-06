// require all Route
const indexRoute = require('./index.route.js');
const adminRoute = require('./admin.route');
const apiRoute = require('./api.route.js');
module.exports = function (app) {
  app.use('/', indexRoute);
  app.use('/admin', adminRoute);
  app.use('/api', apiRoute)
}
