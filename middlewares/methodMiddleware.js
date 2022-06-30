const HTTP_STATUS = require("../utils/enums/error_codes");
const { errorMsgHandler } = require("../utils/errorHandler")

exports.methodNotAllowed = (req, res, next) => {
    return res.status(HTTP_STATUS.METHOD_NOT_ALLOWED).json(errorMsgHandler("NOT_ALLOW", HTTP_STATUS.METHOD_NOT_ALLOWED, "Method Not Allowed/URL Not Found"));
}

exports.urlNotFound = (req, res, next) => {
    return res.status(HTTP_STATUS.NOT_FOUND).json(errorMsgHandler("NOT_FOUND", HTTP_STATUS.NOT_FOUND, "URL Not Found"))
}