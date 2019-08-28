const hashPassword = require('../utils/hashPasswords');
const checkPassword = require('../utils/checkPassword');
const { userExists, createUser, storeToken } = require('../db/user');
const createToken = require('../utils/generateToken');
const ErrorWithHTTPStatus = require('../utils/error.httpStatus.utils');
/**
 * account.js
 * @description: Handles all actions for account information.
 * @param {string} username
 * @param {string} password
 */
async function registerUser({ username, password }) {
  try {
    if (await userExists(username)) {
      throw new ErrorWithHTTPStatus('User already exists.', 400);
    }
    const { hash, salt } = await hashPassword(password);
    await createUser(username, hash, salt);
  } catch (err) {
    throw err;
  }
}
/**
 * loginUser
 * @description Handles the logic for logging in users.
 * @param {string} username
 * @param {string} password
 * @returns {string} JWT Token
 */
async function loginUser({ username, password }) {
  try {
    if (!(await userExists(username))) {
      throw new ErrorWithHTTPStatus('User does not exists.', 400);
    }
    const { uuid, persona } = await checkPassword(username, password);
    const token = await createToken(uuid, persona);
    await storeToken(uuid, token);
    return token;
  } catch (err) {
    throw err;
  }
}
module.exports = { registerUser, loginUser };
