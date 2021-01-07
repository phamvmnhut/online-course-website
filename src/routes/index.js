// require all Route
const indexRoute = require('./index.route');
const adminRoute = require('./admin.route');
const apiRoute = require('./api.route');
module.exports = function (app) {
  app.use('/', indexRoute);
  app.use('/admin', adminRoute);
  app.use('/api', apiRoute)
}
