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

const debug = require('debug')('app:Error');

const app = express();

//try this 

app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({
    defaultLayout: 'main.hbs',
    extname: '.hbs',
    // layoutsDir: 'views/layouts',
    // partialsDir: 'views/partials',
    helpers: {
        section: hbs_sections(),
        ifeq: function(a, b, options) {
            if (a === b) {
                return options.fn(this);
            }
            return options.inverse(this);
        },
        formatDate: function(dd) {
            const date = new Date(dd);
            d = date.getDate();
            m = date.getMonth() + 1;
            y = date.getFullYear();
            return `${d}-${m}-${y}`;
        },
        changeDisplayRoleType: function(r){
            return r == 0 ? 'Học viên' : r == 1 ? 'Giảng viên' : r == 2 ? 'Admin' : '?';
        }
    }
}));

app.set('view engine', 'hbs');

app.set('trust proxy', 1);

// const options = {
//   host: process.env.DATABASE_HOST ? process.env.DATABASE_HOST : 'localhost',
//   port: process.env.DATABASE_PORT ? process.env.DATABASE_PORT : 3306,
//   user: process.env.DATABASE_USER ? process.env.DATABASE_USER : 'root',
//   password: process.env.DATABASE_PASS ? process.env.DATABASE_PASS : 'root',
//   database: process.env.DATABASE_NAME ? process.env.DATABASE_NAME : 'course',
//   charset: 'utf8',
//   schema: {
//     tableName: 'sessions',
//     columnNames: {
//       session_id: 'session_id',
//       expires: 'expires',
//       data: 'data'
//     }
//   }
// };

// const sessionStore = new MySQLStore(options);

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    // store: sessionStore,
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
require('./routes/index.js')(app);

app.use(function(req, res) {
    res.render('404.hbs', {
        layout: false
    })
});

// render 500 error
// app.use(function (err, req, res, next) {
//   debug(err);

//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : "Error";

//   res.status(err.status || 500);
//   res.render('500.hbs', {
//     layout: false
//   });
// });

module.exports = app;