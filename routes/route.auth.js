// ----------------------------------------------------------------
const {bodyParser} = require('../middleware/middleware.protects');

const express = require('express');
const router = express.Router();
const CoreError = require('./../core/core.error');

//load controller and utils
const {
    index, doctorRegister, doctorLogin, maketerRegister, marketerLogin, adminLogin, adminRegister,
} = require('./../controllers/controller.auth');

/**
 * auth routes
 */
router.get('/', index);

//DOCTOR AUTH ROUTES
router.post('/doctor/register', bodyParser, doctorRegister);
router.post('/doctor/login', bodyParser, doctorLogin);

//MARKETER AUTH ROUTES
router.post('/marketer/register', bodyParser, maketerRegister);
router.post('/marketer/login', bodyParser, marketerLogin);

//ADMIN AUTH ROUTES
router.post('/admin/register', bodyParser, adminRegister);
router.post('/admin/login', bodyParser, adminLogin);

/**
 * Export lastly
 */
router.all('/*', (req, res) => {
    throw new CoreError(`route not found ${req.originalUrl} using ${req.method} method`, 404);
})

module.exports = router;