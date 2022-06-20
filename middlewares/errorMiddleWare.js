const { errorMsgHandler } = require("../utils/errorHandler")

exports.errorHandleMiddleware = (req, res) => {
    return res.status(req.status).json(errorMsgHandler(req.errCode, req.status, req.message));
}

exports.validateErrMiddleware = (req, res, next) => {
    
    if (req.errors.length < 1) return next();

    return res.status(422).json({errors : req.errors});
}

exports.initErrors = (req, res, next) => {
    req.errors = [];
    return next();
}