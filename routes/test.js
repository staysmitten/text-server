/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const passport = require('passport');


// connections to DB is now in index

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    res.json({ message: 'You made it!' });
  }
);

module.exports = router;