const HTTP_STATUS = require("../utils/enums/error_codes");
const { errorMsgHandler } = require("../utils/errorHandler")

exports.errorHandleMiddleware = (req, res) => {
    return res.status(req.status).json(errorMsgHandler(req.errCode, req.status, req.message));
}

exports.validateErrMiddleware = (req, res, next) => {
    
    if (req.errors.length < 1) return next();

    return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({errors : req.errors});
}

exports.initErrors = (req, res, next) => {
    req.errors = [];
    return next();
}