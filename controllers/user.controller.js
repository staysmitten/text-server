/**
 * User Controller -> 1 to 1 relationship with User Model
 * Cuz were bored like that
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const User = require('../models/user.model');

/**
 * Creates a single user
 * @param {Object} user Aura user
 * @param {Object} options Additional parameters (optional)
 * @returns Response
 */
const createOne = async (user, options) => {
  const returnAwait = await User.create(user);
  return returnAwait;
};

/**
 * Reads a single user
 * @param {Object} options defines what to find, parameters. Mostly used
 * @returns Response
 */
const readOne = async options => {
  const returnAwait = await User.findOne(options);
  return returnAwait;
};

/**
 * @param {Object} options defines objects to find
 * @returns Response
 */
const readMany = async options => {
  const returnAwait = await User.find(options);
  return returnAwait;
};


const userController = {
  createOne,
  readOne,
  readMany,
};

module.exports = userController;
