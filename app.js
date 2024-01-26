require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
const registerRouter = require('./routes/register')
const loginRouter = require('./routes/login')
const models = require('./models')
const services = require('./services')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

app.models = {
  users: models.users
}


app.services = {
  login: new (services.loginService) (app.models),
  register: new (services.registerService) (app.models)
}


mongoose.connect(
	process.env.MONGOOSE_URL
).then(() =>  console.log("db connected!:"))
.catch(err =>  console.log(err))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
