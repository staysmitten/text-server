const jwt = require('jsonwebtoken');
/**
 * createToken
 * @description Generates a token for each user when they log in.
 * @param {int} id
 * @param {string} persona
 */
async function createToken(id, persona) {
  const payload = {
    id,
    persona
  };
  const additionalInformation = {
    issuer: 'accounts.tppipeline.com',
    audience: 'tppipeline.com',
    expiresIn: process.env.JWT_EXPIRATION_TIME
  };
  return jwt
    .sign(payload, process.env.PRIVATE_KEY, additionalInformation)
    .toString();
}
module.exports = createToken;
