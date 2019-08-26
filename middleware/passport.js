const { ExtractJwt, Strategy } = require('passport-jwt');
// TODO: Get user token
const { getUserToken } = require('../db/user');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.PRIVATE_KEY;
opts.issuer = 'accounts.tppipeline.com';
opts.audience = 'tppipeline.com';
opts.expiresIn = process.env.JWT_EXPIRATION_TIME;

const JWTStrategy = new Strategy(opts, async (jwtPayload, done) => {
  try {
    const storedToken = await getUserToken(jwtPayload.id);
    if (storedToken.token) {
      return done(null, storedToken.id);
    }
    return done(null, false);
  } catch (err) {
    throw err;
  }
});
module.exports = JWTStrategy;
