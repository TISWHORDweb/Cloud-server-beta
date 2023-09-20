/**
 * Slantapp code and properties {www.slantapp.io}
 */
require('dotenv').config()
let express = require('express');
let path = require('path');
let cors = require('cors');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let errorHandler = require('./middleware/middleware.error');
let {errorHandle} = require('./core');
const device = require('express-device');
let indexRouter = require('./routes/index');
const expressLayouts = require('express-ejs-layouts');
let authRouter = require('./routes/route.auth');
let adminRouter = require('./routes/route.admin');
let doctorRouter = require('./routes/route.doctor');
let marketerRouter = require('./routes/route.marketer');
const address = require("address");

//******* logger *********//
const originalConsoleLog = console.log; // Store the original console.log function
global.console.log = function (...args) {
    if (process.env.CONSOLE_LOG === 'true') {
        originalConsoleLog(...args); // Use the original console.log function
    }
};

//******* logger *********//

let app = express();
global.fetch = require('node-fetch');
// view engine setup
app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//enable cross-origin
//set security guard
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Credentials', "true");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/docs', express.static(path.join(__dirname, 'docs')));
app.use(device.capture())

/**
 * list of routes
 */
app.use('*', (req, res, next) => {
    global.appBaseUrl = `${req.protocol}://${req.get('host')}`;
    next();
})

app.use('/handshake', (req, res) => {
    res.json({status: true, message: "Network is okay", data: []})
});

app.use('/api/v1', indexRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/doctor', doctorRouter);
app.use('/api/v1/marketer', marketerRouter);

//after all route, show 404
app.use('*', () => {
    throw new errorHandle("Resource not found", 404);
})
//Add custom error handling controller
app.use(errorHandler);
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
process.on('uncaughtException', function (err) {
    console.error(err);
    console.log("Node NOT Exiting...");
});
// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
