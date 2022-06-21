const { errorMsgHandler } = require("../utils/errorHandler")

exports.methodNotAllowed = (req, res, next) => {
    return res.status(405).json(errorMsgHandler("NOT_ALLOW", 405, "Method/URL Not Allowed"));
}

exports.urlNotFound = (req, res, next) => {
    return res.status(404).json(errorMsgHandler("NOT_FOUND", 404, "URL Not Found"))
}