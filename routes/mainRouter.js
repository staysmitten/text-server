/**
 * This is the main router of the app, index will just call this
 * and this will hold every sub router.
 */

const express = require('express');
const indexRouter = require('./index');
const userRouter = require('./users');
const privateRoute = require('./private/usertable');

const app = express();

// subrouters
app.use('/api/user', userRouter);
app.use('/api/user/admin/', privateRoute);
app.use('/', indexRouter);

module.exports = app;
