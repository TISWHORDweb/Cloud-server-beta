
class CoreError extends Error {
    constructor(msg, code) {
        super(msg);
        this.statusCode = code;
        Error.captureStackTrace(this, this.constructor);
    }
}

exports.CoreError = CoreError;

//json parser function
exports.JParser = (m, s, d) => ({message: m, status: s, data: d});

//ascii code generator
exports.AsciiCodes = function generateChar(length) {
    //populate and store ascii codes
    let charArray = [];
    let code = [];
    for (let i = 33; i <= 126; i++) charArray.push(String.fromCharCode(i));
    //do range random here
    for (let i = 0; i <= length; i++) {
        code.push(charArray[Math.floor(Math.random() * charArray.length - 1)]);
    }
    return code.join("");
}

//otp code
exports.SmsOtp = function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000)
}

exports.Pagination = (page, size) => {
    const limit = !!size ? size : 3
    const offset = !!page ? page * limit : 0;

    return {limit, offset};
}

exports.GetPagingData = (data, page, limit) => {
    const {count: total, rows: list} = data
    const currentPage = !!page ? +page : 0;
    const totalPages = Math.ceil(total / limit);

    return {total, list, totalPages, currentPage};
}

exports.isJson = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

exports.paginated = async (model, req, option = {}, trx = false) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;


    let results = await model.findAndCountAll({
        ...option,
        limit,
        offset,
        order: [
            ['createdAt', 'DESC']
        ],
    });
    if (trx) {
        results.rows = this.sortedData(results.rows)
    }

    const totalPages = Math.ceil(results.count / limit);

    return {
        page,
        limit,
        total: results.count,
        totalPages,
        data: results.rows,
    };
};

// exports.canChangeUsername = async (today, lastChanged) => {
//     let days = Math.round((today - lastChanged) / (1000 * 60 * 60 * 24))
//     return days === 30
// }
