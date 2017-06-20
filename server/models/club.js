const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clubSchema = new Schema({
  yelpId: String,
  guests: [String]
});

module.exports = mongoose.model('clubs', clubSchema);
