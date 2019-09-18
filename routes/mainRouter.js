/**
 * This is the main router of the app, index will just call this
 * and this will hold every sub router.
 */

const express = require('express');
const indexRouter = require('./index');
const userRouter = require('./users');
const authRouter = require('./auth');
const privateRoute = require('./private/usertable');
const testAuth = require('./test');

const app = express();

// subrouters
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/private', privateRoute);
// app.use('/api/private', testAuth);
app.use('/', indexRouter);

module.exports = app;
