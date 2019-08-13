const mongoose = require('mongoose');

const schema = mongoose.Schema({
  firstName: String,
  lastName: String,
  partnerFirstName: String,
  partnerLastName: String,
  number: String,
  partnerNumber: String,
  email: String,
});

const User = mongoose.model('user', schema, 'users');

module.exports = User;
