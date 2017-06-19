const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// never use passport-local-mongoose again
// use simpler solution
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    username: String,
    email: String
});

// error messages are still wrong
User.plugin(passportLocalMongoose, {usernameField: 'email'});

module.exports = mongoose.model('users', User);
