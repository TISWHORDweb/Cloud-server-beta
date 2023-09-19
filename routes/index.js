/**
 * Slantapp code and properties {www.slantapp.io}
 */
let express = require('express');
let router = express.Router();
const {utils, errorHandle} = require("../core");;
const address = require('address');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'WEB App', ip: address.ip()});
});

module.exports = router;
