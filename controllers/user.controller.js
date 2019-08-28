/**
 * User Controller -> 1 to 1 relationship with User Model
 * Cuz were bored like that
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const User = require('../models/user.model');
// AUTHENTICATION
const validate = require('validate.js');
const ErrorWithHTTPStatus = require('../utils/error.httpStatus.utils');
// TODO: Add below
const { registerUser, loginUser } = require('../services/account');
const {
  registrationConstraints,
  loginConstraints,
} = require('../validations/userValidations');

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

const register = async (request, response, next) => {
  try {
    const { body } = request;
    const result = validate(body, registrationConstraints);
    if (result !== undefined) {
      throw new ErrorWithHTTPStatus('Invalid data received.', 400);
    }
    // Appending persona for candidate user (default)
    body.persona = 'candidate';
    await registerUser(body);
    response.status(200).send('Registration Successful.');
  } catch (err) {
    next(err);
  }
};

const login = async (request, response, next) => {
  try {
    const { body } = request;
    const result = validate(body, loginConstraints);
    if (result !== undefined) {
      throw new ErrorWithHTTPStatus('Invalid data received.', 400);
    }
    const token = await loginUser(body);

    response
      .status(200)
      .set('token', `Bearer ${token}`)
      .send('Login Successful.');
  } catch (err) {
    next(err);
  }
};

const userController = {
  createOne,
  readOne,
  readMany,
  register,
  login,
};

module.exports = userController;
