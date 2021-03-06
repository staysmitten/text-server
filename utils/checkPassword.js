const bcrypt = require('bcryptjs');
const { getUser } = require('../db/user');
const ErrorWithHTTPStatus = require('../utils/error.httpStatus.utils');
/**
 * Checks if password user passes in is the same as the one stored in the database
 * @param {string} username
 * @param {string} password
 * @returns {Object} User data
 */
async function checkPassword(username, password) {
  const foundUser = await getUser(username);
  const hashedPassword = await bcrypt.hash(password, foundUser.salt);
  if (foundUser.password !== hashedPassword) {
    throw new ErrorWithHTTPStatus('Authentication failed', 400);
  }
  return foundUser;
}
module.exports = checkPassword;
