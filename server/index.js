require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


// i should probably improve naming of this
// and folder structure import export convention etc
const routes = require('./routes');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

app.use(require('cors')());


app.use(bodyParser.json());
app.use(cookieParser());
app.use(require('express-session')({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

var User = require('./models/user');
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// require('./config/passport');
// app.use(passport.initialize());
// app.use(passport.session());
//router(app, passport);

// passport is singleton???
app.use('/api', routes);



app.use(function (req, res, next) {
  console.log('404');
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(err.status || 500);
  res.json({
    'errors': {
      message: err.message,
      error: err
    }
  });
});




//Server Setup(Express)
// app.listen(process.env.SERVER_PORT, '0.0.0.0', () => {
//   console.log(`Server is listening on ${process.env.SERVER_PORT}`)
// })
app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is listening on ${process.env.SERVER_PORT}`)
})
