require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');


// i should probably improve naming of this
// and folder structure import export convention etc
const routes = require('./routes');

mongoose.connect(process.env.MONGODB_URI);

app.use(require('cors')());


app.use(bodyParser.json());

// require('./config/passport');
// app.use(passport.initialize());
// app.use(passport.session());
//router(app, passport);

// passport is singleton???
app.use('/', routes);

//Server Setup(Express)
// app.listen(process.env.SERVER_PORT, '0.0.0.0', () => {
//   console.log(`Server is listening on ${process.env.SERVER_PORT}`)
// })
app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is listening on ${process.env.SERVER_PORT}`)
})
