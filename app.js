var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
var index = require('./routes/index');
var users = require('./routes/users');
var expresshbs=require('express-handlebars');
var expressValidator=require('express-validator');
var session=require('express-session');
var passport=require('passport');
var flash=require('connect-flash');
var app = express();
var db=mongoose.connect('mongodb://localhost:27017/shopping');
mongoose.connection.on('connected', function () {  
  console.log('success ' );
}); 
// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' );
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

// view engine setup
app.engine('.hbs',expresshbs({defaultLayout:'layout',extname:'.hbs'}));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(expressValidator());
app.use(session({secret:'asdfsad',resave:false,saveUninitialized:false}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
require('./config/passport');

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
