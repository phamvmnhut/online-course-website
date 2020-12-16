const express = require('express');
require('express-async-errors');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const exphbs = require('express-handlebars');
const hbs_sections = require('express-handlebars-sections');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const route = require('./routes');

const app = express();

app.engine('hbs', exphbs({
  defaultLayout: 'main.hbs',
  extname: '.hbs',
  helpers: {
    section: hbs_sections(),
  }
}));
app.set('view engine', 'hbs');

app.set('trust proxy', 1);
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    // secure: true
  }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// static file
app.use('/public', express.static(path.join(__dirname, 'public')));

// log 
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('common', {
    skip: (req, res) => res.statusCode < 400,
    stream: fs.createWriteStream(path.join(__dirname, '../', 'server.log'), { flags: 'a' }),
  }));
} else {
  app.use(morgan('dev'));
}

// route
route(app);

// render error
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;