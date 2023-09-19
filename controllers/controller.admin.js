/**
 * Slantapp code and properties {www.slantapp.io}
 */
const useAsync = require('../core/core.async');
const {utils, errorHandle} = require("../core");
const Joi = require("joi");
const sha1 = require("sha1");
const { ModelAdmin } = require('../models');

//ALL ADMIN
exports.allAdmins = useAsync(async (req, res) => {

    try {

        const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
        const pageSize = parseInt(req.query.pageSize) || 10;
    
        // Calculate the start index and end index based on the page and pageSize
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
    
        const admin = await ModelAdmin.findAll({
          attributes: { exclude: ["pin"] },
        });
    
        const paginatedData = admin.slice(startIndex, endIndex);

        res.json(utils.JParser("All Admin", !!paginatedData, paginatedData));
    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})

//GET ADMIN
exports.getAdmin= useAsync(async (req, res) => {
    try {

        const aid = req.adminId
        const options = {
            where: {aid},
        }

        const admin = await ModelAdmin.findOne(options);
        res.json(utils.JParser('Admin fetched successfully', !!admin, admin))
    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})
