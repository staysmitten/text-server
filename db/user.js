
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const User = require('../models/admin.model');


/**
 * userExists
 * @description: Checks if the username already exists in the database
 * @param {string} username
 */
async function userExists(body) {
  try {
    const result = await User.findOne(body);
    return result !== null;
  } catch (err) {
    console.log('User Exist error');
    throw err;
  }
}
/**
 * createUser
 * @description Stores user data in the database
 * @param {string} username
 * @param {string} password
 * @param {string} salt
 */
async function createUser(username, password, salt) {
  try {
    await User.create({
      username,
      password,
      salt,
    });
  } catch (err) {
    throw err;
  }
}
/**
 * getPassword
 * @description Gets user data.
 * @param {string} username
 * @returns {object} An object containing hash and salt
 */
async function getUser(username) {
  try {
    return await User.findOne({username: username});
  } catch (err) {
    throw err;
  }
}
/**
 * Finds and returns user token of already logged in user
 * @param {string} id The stored id in the JWT that corresponds with a user.
 */
async function getUserToken(id) {
  try {
    const result = await User.findOne({
        uuid:id,
    });
    return { token: result.token, id: result.uuid };
  } catch (err) {
    throw err;
  }
}
/**
 * storeToken
 * @description Stores token in the user's database
 * @param {string} username
 * @param {string} token
 */
async function storeToken(uuid, token) {
  try {
    await User.update({ token }, { uuid });
  } catch (err) {
    throw err;
  }
}
module.exports = { userExists, createUser, getUser, storeToken, getUserToken };
