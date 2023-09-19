// ----------------------------------------------------------------
const {bodyParser, marketerBodyGuard} = require('../middleware/middleware.protects');

const express = require('express');
const router = express.Router();
const CoreError = require('./../core/core.error');

//load controller and utils
const { allAdmins, getAdmin } = require('../controllers/controller.admin');
const { allMarketers, getMarketer } = require('../controllers/controller.marketer');

/**
 * auth routes
 */

//MAEKETER 
router.get('/all', marketerBodyGuard, allMarketers);
router.get('/single', marketerBodyGuard, getMarketer);

/**
 * Export lastly
 */
router.all('/*', (req, res) => {
    throw new CoreError(`route not found ${req.originalUrl} using ${req.method} method`, 404);
})

module.exports = router;