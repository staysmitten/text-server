/**
 * This is the main router of the app, index will just call this
 * and this will hold every sub router.
 */

const express = require('express');
const passport = require('passport');
const indexRouter = require('./index');
const userRouter = require('./users');
const privateRoute = require('./private/usertable');

const app = express();

// subrouters
app.use('/api/user', userRouter);
app.use('/api/user/admin/', 
  passport.authenticate('jwt', { session: false }),
  privateRoute);
app.use('/', indexRouter);

module.exports = app;
