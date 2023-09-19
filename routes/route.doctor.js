// ----------------------------------------------------------------
const {bodyParser, doctorBodyGuard} = require('../middleware/middleware.protects');

const express = require('express');
const router = express.Router();
const CoreError = require('./../core/core.error');

//load controller and utils
const { allDoctors, getDoctor } = require('../controllers/controller.doctor');

/**
 * auth routes
 */

//DOCTOR 
router.get('/all', doctorBodyGuard, allDoctors);
router.get('/single', doctorBodyGuard, getDoctor);

/**
 * Export lastly
 */
router.all('/*', (req, res) => {
    throw new CoreError(`route not found ${req.originalUrl} using ${req.method} method`, 404);
})

module.exports = router;