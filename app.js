require('dotenv').config();
var createError = require('http-errors');
const cors = require('cors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const DataMaster = require('./controllers/DataMaster');
const errorHandler = require('./middleware/errorHandler');
const JwtStrategy = require('./passport');
const passport = require('passport');



// MongoDB stuff
var mainRouter = require('./routes/mainRouter');

var app = express();

const connector = new DataMaster();
connector.connectForMutations(process.env.DB_NAME_TEST);

// Express Stuff
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// authentication middleware
app.use(passport.initialize());
passport.use(JwtStrategy);

// routes
app.use('/', mainRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));

module.exports = app;
