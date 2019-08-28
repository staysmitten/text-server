/**
 * User Constraints
 * @description: Used with validation.js npm package to validate user registration data.
 */
const registrationConstraints = {
  username: {
    username: true,
    presence: true,
    length: { minimum: 3 }
  },
  password: {
    presence: true,
    length: { minimum: 8 }
  },
};

const loginConstraints = {
  username: {
    username: true,
    presence: true,
    length: { minimum: 3 }
  },
  password: {
    presence: true,
    length: { minimum: 8 }
  }
};
module.exports = { registrationConstraints, loginConstraints };
