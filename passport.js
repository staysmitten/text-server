const passportJwt = require('passport-jwt');
const DataMaster = require('./controllers/DataMaster');

const { Strategy, ExtractJwt } = passportJwt;

const database = new DataMaster(process.env.ENVIRONMENT);

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: process.env.JWT_SECRET,
  issuer: process.env.JWT_ISSUER,
  passReqToCallback: true,
};

const JwtStrategy = new Strategy(options, async (req, payload, done) => {
  try {
    // find the associated user
    console.log(req);
    // console.log('HERRE');
    const user = await database.findUserById(payload._id);
    req.user = user;
    // return use
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});

module.exports = JwtStrategy;