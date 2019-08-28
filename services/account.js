const hashPassword = require('../utils/hashPasswords');
const checkPassword = require('../utils/checkPassword');
const { userExists, createUser, storeToken } = require('../db/user');
const createToken = require('../utils/generateToken');
const ErrorWithHTTPStatus = require('../utils/error.httpStatus.utils');
/**
 * account.js
 * @description: Handles all actions for account information.
 * @param {string} email
 * @param {string} fullName
 * @param {string} password
 * @param {string} location
 * @param {string} persona
 */
async function registerUser({ email, fullName, password, location, persona }) {
  try {
    if (await userExists(email)) {
      throw new ErrorWithHTTPStatus('User already exists.', 400);
    }
    const { hash, salt } = await hashPassword(password);
    await createUser(email, hash, salt, fullName, location, persona);
  } catch (err) {
    throw err;
  }
}
/**
 * loginUser
 * @description Handles the logic for logging in users.
 * @param {string} email
 * @param {string} password
 * @returns {string} JWT Token
 */
async function loginUser({ email, password }) {
  try {
    if (!(await userExists(email))) {
      throw new ErrorWithHTTPStatus('User does not exists.', 400);
    }
    const { uuid, persona } = await checkPassword(email, password);
    const token = await createToken(uuid, persona);
    await storeToken(uuid, token);
    return token;
  } catch (err) {
    throw err;
  }
}
module.exports = { registerUser, loginUser };
