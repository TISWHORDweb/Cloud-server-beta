/**
 * Slantapp code and properties {www.slantapp.io}
 */
let { ModelDoctor, ModelMarketer, ModelAdmin } = require('../models');
const { errorHandle, useAsync } = require('../core');
const CryptoJS = require("crypto-js");

//body safe state
exports.bodyParser = (req, res, next) => {
    if (!Object.keys(req.body).length > 0) throw new errorHandle("the document body is empty", 202);
    else next();
}

//admin bodyguard
exports.adminBodyGuard = useAsync(async (req, res, next) => {
    const cToken = req.headers['c-token'];
    if (typeof cToken == 'undefined') throw new errorHandle("Unauthorized Access, Use a valid token and try again", 401);
    //check and decode confirm code validity
    const isValid = await ModelAdmin.findOne({ where: { token: cToken } });
    
    if (isValid) {
        //****** Decrypt Last Login Date and Time *******//
        const bytes = CryptoJS.AES.decrypt(isValid.lastLogin, process.env.SECRET_KEY);
        let lastLogin = bytes.toString(CryptoJS.enc.Utf8);

        //****** Convert to date from string *******//
        lastLogin = JSON.parse(lastLogin)
        lastLogin = new Date(lastLogin) 
        //****** Calculate an hour ago in milliseconds *******//
        const oneHour = 60 * 60 * 1000; /* ms */
        const HalfHour = 30 * 60 * 1000; /* ms */
        const Both = +oneHour + +HalfHour;

        //********** Throw error if token has expired (1hr) **************//
        if (((new Date) - lastLogin) > Both) throw new errorHandle("Invalid or expired token, Use a valid token and try again", 401);

        req.adminId = isValid?.aid
        next()

    } else throw new errorHandle("Invalid code or token, Use a valid token and try again", 401);
})

//Doctor bodyguard
exports.doctorBodyGuard = useAsync(async (req, res, next) => {
    const cToken = req.headers['c-token'];
    if (typeof cToken == 'undefined') throw new errorHandle("Unauthorized Access, Use a valid token and try again", 401);

    //check and decode confirm code validity
    const isValid = await ModelDoctor.findOne({ where: { token: cToken } });

    if (isValid) {
        //****** Decrypt Last Login Date and Time *******//
        const bytes = CryptoJS.AES.decrypt(isValid.lastLogin, process.env.SECRET_KEY);
        let lastLogin = bytes.toString(CryptoJS.enc.Utf8);

        //****** Convert to date from string *******//
        lastLogin = JSON.parse(lastLogin)
        lastLogin = new Date(lastLogin)

        //****** Calculate an hour ago in milliseconds *******//
        const oneHour = 60 * 60 * 1000; /* ms */
        const HalfHour = 30 * 60 * 1000; /* ms */
        const Both = +oneHour + +HalfHour;

        //********** Throw error if token has expired (1hr) **************//
        if (((new Date) - lastLogin) > Both) throw new errorHandle("Invalid or expired token, Use a valid token and try again", 401);

        req.doctorId = isValid.did
        if (isValid.whoIs === 0) next();
        else throw new errorHandle("token is valid but is not authorized for this route, Use a valid token and try again", 401);
    } else throw new errorHandle("Invalid token code or token, Use a valid token and try again", 401);
})

//Marketer bodyguard
exports.marketerBodyGuard = useAsync(async (req, res, next) => {
    const cToken = req.headers['c-token'];

    if (typeof cToken == 'undefined') throw new errorHandle("Unauthorized Access, Use a valid token and try again", 401);

    //check and decode confirm code validity
    const isValid = await ModelMarketer.findOne({ where: { token: cToken } });

    if (isValid) {
        //****** Decrypt Last Login Date and Time *******//
        const bytes = CryptoJS.AES.decrypt(isValid.lastLogin, process.env.SECRET_KEY);
        let lastLogin = bytes.toString(CryptoJS.enc.Utf8);

        //****** Convert to date from string *******//
        lastLogin = JSON.parse(lastLogin)
        lastLogin = new Date(lastLogin)

        //****** Calculate an hour ago in milliseconds *******//
        const oneHour = 60 * 60 * 1000; /* ms */
        const HalfHour = 30 * 60 * 1000; /* ms */
        const Both = +oneHour + +HalfHour;

        //********** Throw error if token has expired (1hr) **************//
        if (((new Date) - lastLogin) > Both) throw new errorHandle("Invalid or expired token, Use a valid token and try again", 401);

        req.marketerId = isValid.mid;
        next();
    } else {
        throw new errorHandle("Token is valid but is not authorized for this route, Use a valid token and try again", 401);
    }
});
