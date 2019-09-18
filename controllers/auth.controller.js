/**
 * User Controller -> 1 to 1 relationship with User Model
 * Cuz were bored like that
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const Admin = require('../models/admin.model');

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
const readOne = async (options) => {
  const returnAwait = await Admin.findOne(options);
  return returnAwait;
};

const adminController = {
  createOne,
  readOne
};

module.exports = adminController;
