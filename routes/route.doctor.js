// ----------------------------------------------------------------
const {bodyParser, doctorBodyGuard} = require('../middleware/middleware.protects');

const express = require('express');
const router = express.Router();
const CoreError = require('./../core/core.error');

//load controller and utils
const { allDoctors, getDoctor } = require('../controllers/controller.doctor');
const { allFaq } = require('../controllers/controller.faq');
const { patient } = require('../controllers/controller.patient');

/**
 * auth routes
 */

//DOCTOR 
router.get('/all', doctorBodyGuard, allDoctors);
router.get('/single', doctorBodyGuard, getDoctor);

//FAQ
router.get('/faq/all', doctorBodyGuard, allFaq);

//PATIENT
router.post('/patient', doctorBodyGuard, patient);

/**
 * Export lastly
 */
router.all('/*', (req, res) => {
    throw new CoreError(`route not found ${req.originalUrl} using ${req.method} method`, 404);
})

module.exports = router;