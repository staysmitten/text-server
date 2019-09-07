const mongoose = require('mongoose');

const schema = mongoose.Schema({
  fullName: String,
  partnerFullName: String,
  number: String,
  partnerNumber: String,
  email: String,
  date: String,
  status: String,
});

const User = mongoose.model('user', schema, 'users');

module.exports = User;
