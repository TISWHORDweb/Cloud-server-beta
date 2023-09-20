// ---------------------------------------------------------------
const useAsync = require('../core/core.async');
const {utils, errorHandle} = require("../core");
const Joi = require("joi");
const sha1 = require("sha1");
const ModelPatient = require("../models/model.patient");


exports.patient = useAsync(async (req, res, next) => {
    try {
        //create data if all data available
        const schema = Joi.object({
            email: Joi.string().email({minDomainSegments: 2}).required(),
            fullName: Joi.string().min(3).max(150).required().lowercase(),
            phone: Joi.string().min(3).max(150).required(),
            gender: Joi.string().min(6).max(12).required(),
            birthDate: Joi.string().min(6).max(12).required(),
            doctor: Joi.string()
        })

        //validate Admin
        const value = await schema.validateAsync(req.body);

        //------------Validate Admin-------------------------------
        const validates = await ModelPatient.findOne({where: {email: value.email}})
        if (validates) return res.json(utils.JParser("The email is taken. Kindly provide another.", false, []));
        // Regular expression to validate email format
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      
        if (!emailRegex.test(value.email)) return res.json(utils.JParser("Invalid email format", false, []));

        //insert into db
        const created = await ModelPatient.create(value);

        //send a welcome email here
        if (created) {
            res.json(utils.JParser("Patient created successful", true, created));
        } else {
            res.json(utils.JParser("Error, Try again later", false, []));
        }

    } catch (e) {
        throw new errorHandle(e.message, 400);
    }
});