/**
 * Slantapp code and properties {www.slantapp.io}
 */

const sha1 = require('sha1');
const Joi = require('joi');
const address = require('address')
const ipapi = require('ipapi.co');

/**
 * importing custom model
 */
const {useAsync, utils, errorHandle,} = require('./../core');
/**
 * importing models
 */
const {Notify, EmailNote} = require("../core/core.notify");
const {etpl} = require("../services");
const os = require('os')
const CryptoJS = require("crypto-js")
const {Op, where, literal} = require('sequelize');
const ModelDoctor = require('../models/model.doctor');
const ModelAdmin = require('../models/model.admin');
const ModelMarketer = require('../models/model.marketer');


/**
 * @type {function(*=, *=, *=): Promise<unknown>}
 */
exports.index = useAsync(async (req, res) => {
    res.json(utils.JParser("Welcome to auth api", true, {}));
})

/**
 * @route-controller /api/v1/auth/register
 * @type {function(*=, *=, *=): Promise<unknown>}
 */
exports.maketerRegister = useAsync(async (req, res, next) => {
    try {
        //create data if all data available
        const schema = Joi.object({
            email: Joi.string().email({minDomainSegments: 2}).required(),
            fullName: Joi.string().min(3).max(150).required().lowercase(),
            phone: Joi.string().min(3).max(150).required(),
            password: Joi.string().min(6).max(12).required()
        })

        //validate Marketer
        const value = await schema.validateAsync(req.body);

        //rebuild Marketer object
        value.apiKey = sha1(value.email + new Date().toISOString + process.env.SECRET_KEY);
        value.token = sha1(value.email + new Date().toISOString + process.env.SECRET_KEY)
        value.password = sha1(value.password);

        //------------Validate Email-------------------------------
        const validates = await ModelMarketer.findOne({where: {email: value.email}})
        if (validates) return res.json(utils.JParser("The email is taken. Kindly provide another.", false, []));
        // Regular expression to validate email format
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      
        if (!emailRegex.test(value.email)) return res.json(utils.JParser("Invalid email format", false, []));

        //insert into db
        const created = await ModelMarketer.create(value);

        //send a welcome email here
        if (created) {
            res.json(utils.JParser("ok-registration is successful", true, created));
            /**
             * Send OTP to both SMS and Email
             */
        } 

    } catch (e) {
        throw new errorHandle(e.message, 400);
    }
});

/**
 * @route-controller /api/v1/auth/register
 * @type {function(*=, *=, *=): Promise<unknown>}
 */
exports.doctorRegister = useAsync(async (req, res, next) => {
    try {
        //create data if all data available
        const schema = Joi.object({
            email: Joi.string().email({minDomainSegments: 2}).required(),
            fullName: Joi.string().min(3).max(150).required().lowercase(),
            phone: Joi.string().min(3).max(150).required(),
            password: Joi.string().min(6).max(12).required()
        })

        //validate Docotor
        const value = await schema.validateAsync(req.body);

        //rebuildDocotor object
        value.apiKey = sha1(value.email + new Date().toISOString + process.env.SECRET_KEY);
        value.token = sha1(value.email + new Date().toISOString + process.env.SECRET_KEY)
        value.password = sha1(value.password);

        //------------Validate Email-------------------------------
        const validates = await ModelDoctor.findOne({where: {email: value.email}})
        if (validates) return res.json(utils.JParser("The email is taken. Kindly provide another.", false, []));
        // Regular expression to validate email format
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      
        if (!emailRegex.test(value.email)) return res.json(utils.JParser("Invalid email format", false, []));

        //insert into db
        const created = await ModelDoctor.create(value);

        //send a welcome email here
        if (created) {
            res.json(utils.JParser("ok-registration is successful", true, created));
            /**
             * Send OTP to both SMS and Email
             */
        } 

    } catch (e) {
        throw new errorHandle(e.message, 400);
    }
});

/**
 * @route-controller /api/v1/auth/register
 * @type {function(*=, *=, *=): Promise<unknown>}
 */
exports.adminRegister = useAsync(async (req, res, next) => {
    try {
        //create data if all data available
        const schema = Joi.object({
            email: Joi.string().email({minDomainSegments: 2}).required(),
            fullName: Joi.string().min(3).max(150).required().lowercase(),
            phone: Joi.string().min(3).max(150).required(),
            password: Joi.string().min(6).max(12).required()
        })

        //validate Admin
        const value = await schema.validateAsync(req.body);

        //rebuild Admin object
        value.apiKey = sha1(value.email + new Date().toISOString);
        value.token = sha1(value.email + new Date().toISOString);
        value.password = sha1(value.password);

        //------------Validate Admin-------------------------------
        const validates = await ModelAdmin.findOne({where: {email: value.email}})
        if (validates) return res.json(utils.JParser("The email is taken. Kindly provide another.", false, []));
        // Regular expression to validate email format
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      
        if (!emailRegex.test(value.email)) return res.json(utils.JParser("Invalid email format", false, []));

        //insert into db
        const created = await ModelAdmin.create(value);

        //send a welcome email here
        if (created) {
            res.json(utils.JParser("ok-registration is successful", true, created));
            /**
             * Send OTP to both SMS and Email
             */
        } 

    } catch (e) {
        throw new errorHandle(e.message, 400);
    }
});

/**
 * @route-controller /api/v1/auth/login
 * @type {function(*=, *=, *=): Promise<unknown>}
 */
exports.doctorLogin = useAsync(async (req, res, next) => {
    try {

        //create data if all data available
        const schema = Joi.object({
            email: Joi.string().email({minDomainSegments: 2}).required(),
            password: Joi.string().required(),
        })

        //capture business data
        const {email, password} = req.body;

        //validate business
        const validator = await schema.validateAsync(req.body);

        //hash password before checking
        validator.password = sha1(validator.password);
        validator.apiKey = sha1(validator.email + new Date());
        validator.token = sha1(validator.email + new Date());
        const token = validator.token;

        const doctor = await ModelDoctor.findOne({
            where: {email: validator.email, password: validator.password}
        });

          // Regular expression to validate email format
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      
        if (!emailRegex.test(validator.email)) return res.json(utils.JParser("Invalid email format", false, []));

        //check business exists
        if (!doctor) return res.status(401).json(utils.JParser('Invalid credentials', false, {}))

        //lastLogin
        const lastLogin = CryptoJS.AES.encrypt(JSON.stringify(new Date()), process.env.SECRET_KEY).toString()

       doctor.update({ isActive: true, token, lastLogin})

        //return details
        res.json(utils.JParser("ok-response", !!doctor, doctor));

    } catch (e) {
        throw new errorHandle(e.message, 400);
    }
});

/**
 * @route-controller /api/v1/auth/login
 * @type {function(*=, *=, *=): Promise<unknown>}
 */
exports.adminLogin = useAsync(async (req, res, next) => {
    try {

        //create data if all data available
        const schema = Joi.object({
            email: Joi.string().email({minDomainSegments: 2}).required(),
            password: Joi.string().required(),
        })

        //capture business data
        const {email, password} = req.body;

        //validate business
        const validator = await schema.validateAsync(req.body);

        //hash password before checking
        validator.password = sha1(validator.password);
        validator.apiKey = sha1(validator.email + new Date());
        validator.token = sha1(validator.email + new Date());
        const token = validator.token

        const admin = await ModelAdmin.findOne({
            where: {email: validator.email, password: validator.password}
        });

          // Regular expression to validate email format
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      
        if (!emailRegex.test(validator.email)) return res.json(utils.JParser("Invalid email format", false, []));

        //check business exists
        if (!admin) return res.status(401).json(utils.JParser('Invalid credentials', false, {}))

        //lastLogin
        const lastLogin = CryptoJS.AES.encrypt(JSON.stringify(new Date()), process.env.SECRET_KEY).toString()

       admin.update({ isActive: true, token, lastLogin})

        //return details
        res.json(utils.JParser("ok-response", !!admin, admin));

    } catch (e) {
        throw new errorHandle(e.message, 400);
    }
});

/**
 * @route-controller /api/v1/auth/login
 * @type {function(*=, *=, *=): Promise<unknown>}
 */
exports.marketerLogin = useAsync(async (req, res, next) => {
    try {

        //create data if all data available
        const schema = Joi.object({
            email: Joi.string().email({minDomainSegments: 2}).required(),
            password: Joi.string().required(),
        })

        //capture business data
        const {email, password} = req.body;

        //validate business
        const validator = await schema.validateAsync(req.body);

        //hash password before checking
        validator.password = sha1(validator.password);
        validator.apiKey = sha1(validator.email + new Date());
        validator.token = sha1(validator.email + new Date());
        const token = validator.token

        const marketer = await ModelMarketer.findOne({
            where: {email: validator.email, password: validator.password}
        });

          // Regular expression to validate email format
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      
        if (!emailRegex.test(validator.email)) return res.json(utils.JParser("Invalid email format", false, []));

        //check business exists
        if (!marketer) return res.status(401).json(utils.JParser('Invalid credentials', false, {}))

        //lastLogin
        const lastLogin = CryptoJS.AES.encrypt(JSON.stringify(new Date()), process.env.SECRET_KEY).toString()

       marketer.update({ isActive: true, token, lastLogin})

        //return details
        res.json(utils.JParser("ok-response", !!marketer, marketer));

    } catch (e) {
        throw new errorHandle(e.message, 400);
    }
});
