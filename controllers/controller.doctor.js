/**
 * Slantapp code and properties {www.slantapp.io}
 */
const useAsync = require('../core/core.async');
const {utils, errorHandle} = require("../core");
const Joi = require("joi");
const sha1 = require("sha1");
const { ModelDoctor } = require('../models');

//ALL DOCTORS
exports.allDoctors = useAsync(async (req, res) => {

    try {

        const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
        const pageSize = parseInt(req.query.pageSize) || 10;
    
        // Calculate the start index and end index based on the page and pageSize
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
    
        const doctors = await ModelDoctor.findAll({
          attributes: { exclude: ["pin"] },
        });
    
        const paginatedData = doctors.slice(startIndex, endIndex);

        res.json(utils.JParser("All Doctors", !!paginatedData, paginatedData));
    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})

//GET DOCTOR
exports.getDoctor = useAsync(async (req, res) => {
    try {

        const did = req.doctorId

        const options = {
            where: {did},
        }

        const doctor = await ModelDoctor.findOne(options);
        res.json(utils.JParser('Doctor fetched successfully', !!doctor, doctor))
    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})
