/**
 * Slantapp code and properties {www.slantapp.io}
 */
const useAsync = require('../core/core.async');
const {utils, errorHandle} = require("../core");
const Joi = require("joi");
const sha1 = require("sha1");
const { ModelMarketer } = require('../models');

//ALL MARKETER
exports.allMarketers = useAsync(async (req, res) => {

    try {

        const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
        const pageSize = parseInt(req.query.pageSize) || 10;
    
        // Calculate the start index and end index based on the page and pageSize
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
    
        const marketer = await ModelMarketer.findAll({
          attributes: { exclude: ["pin"] },
        });
    
        const paginatedData = marketer.slice(startIndex, endIndex);

        res.json(utils.JParser("All Marketers", !!paginatedData, paginatedData));
    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})

//GET MARKETER
exports.getMarketer = useAsync(async (req, res) => {
    try {

        const mid = req.marketerId
        const options = {
            where: {mid},
        }

        const marketer = await ModelMarketer.findOne(options);
        res.json(utils.JParser('Marketer fetched successfully', !!marketer, marketer))
    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})
