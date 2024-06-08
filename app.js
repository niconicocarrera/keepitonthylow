var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var layouts = require('express-ejs-layouts');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//HEADER VIEW ROUTES
var musicRouter = require('./routes/music');
var visualsRouter = require('./routes/visuals');
var archiveRouter = require('./routes/archive');
var shopRouter = require('./routes/shop');
//FOOTER VIEW ROUTES
var aboutRouter = require('./routes/about');
var contactRouter = require('./routes/contact');
var helpRouter = require('./routes/help');
var privacyRouter = require('./routes/privacy');
//DB VIEW ROUTES
var productRouter = require('./routes/product');
var customerRouter = require('./routes/customer');
var orderdetailRouter = require('./routes/orderdetail');
var saleorderRouter = require('./routes/saleorder');
var supplierRouter = require('./routes/supplier');
var categoryRouter = require('./routes/category');
var searchRouter = require('./routes/search');
var promotionRouter = require('./routes/promotion');
var reportRouter = require('./routes/report');




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(layouts);
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist/")));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/music', musicRouter);
app.use('/visuals', visualsRouter);
app.use('/archive', archiveRouter);
app.use('/shop', shopRouter);
app.use('/help', helpRouter);
app.use('/privacy', privacyRouter);
app.use('/product', productRouter);
app.use('/customer', customerRouter);
app.use('/orderdetail', orderdetailRouter);
app.use('/saleorder', saleorderRouter);
app.use('/category', categoryRouter);
app.use('/supplier', supplierRouter);
app.use('/search', searchRouter);
app.use('/promotion', promotionRouter);
app.use('/report', reportRouter);




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const mariadb = require('mariadb/callback');
const dotenv = require('dotenv');
dotenv.config();
const db = mariadb.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
});
// connect to database
db.connect((err) => {
  if (err) {
    console.log("Unable to connect to database due to error: " + err);
    res.render('error');
  } else {
    console.log("Connected to DB");
  }
});
global.db = db;

module.exports = app;

