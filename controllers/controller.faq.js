// ---------------------------------------------------------------
const useAsync = require('../core/core.async');
const {utils, errorHandle} = require("../core");
const Joi = require("joi");
const sha1 = require("sha1");
const ModelPatient = require("../models/model.patient");
const ModelFaq = require('../models/model.faq');


//CREATE FAQ
exports.faq = useAsync(async (req, res, next) => {
    try {
        //create data if all data available
        const schema = Joi.object({
            question: Joi.string().required(),
            answer: Joi.string().required()
        })

        const value = await schema.validateAsync(req.body);

        //insert into db
        const faq = await ModelFaq.create(value);

        if (faq) {
            res.json(utils.JParser("Faq created successful", !!faq, faq));
        } else {
            res.json(utils.JParser("Error, Try again later", false, []));
        }

    } catch (e) {
        throw new errorHandle(e.message, 400);
    }
});

//ALL FAQ
exports.allFaq = useAsync(async (req, res) => {

    try {

        const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
        const pageSize = parseInt(req.query.pageSize) || 10;
    
        // Calculate the start index and end index based on the page and pageSize
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
    
        const faq = await ModelFaq.findAll();
    
        const paginatedData = faq.slice(startIndex, endIndex);

        res.json(utils.JParser("All FAQ", !!paginatedData, paginatedData));
    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})