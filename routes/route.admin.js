// ----------------------------------------------------------------
const {bodyParser, adminBodyGuard} = require('../middleware/middleware.protects');

const express = require('express');
const router = express.Router();
const CoreError = require('./../core/core.error');

//load controller and utils
const { allAdmins, getAdmin } = require('../controllers/controller.admin');
const { faq } = require('../controllers/controller.faq');

/**
 * auth routes
 */

//ADMIN 
router.get('/all', adminBodyGuard, allAdmins);
router.get('/single', adminBodyGuard, getAdmin);

//FAQ
router.post('/faq/create', adminBodyGuard, faq);

/**
 * Export lastly
 */
router.all('/*', (req, res) => {
    throw new CoreError(`route not found ${req.originalUrl} using ${req.method} method`, 404);
})

module.exports = router;