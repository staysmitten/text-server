const jwt = require('jsonwebtoken');
/**
 * createToken
 * @description Generates a token for each user when they log in.
 * @param {int} id
 */
async function createToken(id) {
  const payload = {
    id
  };
  const additionalInformation = {
    issuer: 'accounts.staysmittentext.com',
    audience: 'staysmittentext.com',
    expiresIn: process.env.JWT_EXPIRATION_TIME
  };
  return jwt
    .sign(payload, process.env.PRIVATE_KEY, additionalInformation)
    .toString();
}
module.exports = createToken;
