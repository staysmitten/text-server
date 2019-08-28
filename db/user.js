
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const User = require('../models/user.model');


/**
 * userExists
 * @description: Checks if the email already exists in the database
 * @param {string} email
 */
async function userExists(email) {
  try {
    const result = await User.findOne({
      where: {
        email,
      },
    });
    return result !== null;
  } catch (err) {
    throw err;
  }
}
/**
 * createUser
 * @description Stores user data in the database
 * @param {string} email
 * @param {string} password
 * @param {string} salt
 * @param {string} fullName
 * @param {string} location
 * @param {string} persona
 */
async function createUser(email, password, salt, fullName, location, persona) {
  try {
    await User.create({
      email,
      password,
      salt,
      fullName,
      location,
      persona,
    });
  } catch (err) {
    throw err;
  }
}
/**
 * getPassword
 * @description Gets user data.
 * @param {string} email
 * @returns {object} An object containing hash and salt
 */
async function getUser(email) {
  try {
    return await User.findOne({
      where: {
        email,
      },
    });
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
      where: {
        uuid:id,
      },
    });
    return { token: result.token, id: result.uuid };
  } catch (err) {
    throw err;
  }
}
/**
 * storeToken
 * @description Stores token in the user's database
 * @param {string} email
 * @param {string} token
 */
async function storeToken(uuid, token) {
  try {
    await User.update({ token }, { where: { uuid } });
  } catch (err) {
    throw err;
  }
}
module.exports = { userExists, createUser, getUser, storeToken, getUserToken };
