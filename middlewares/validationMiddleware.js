const HTTP_STATUS = require("../utils/enums/error_codes");
const { errorMsgHandler, errorMsgGenerator } = require("../utils/errorHandler");
const emailRegex = /^[\/0-9=?A-Z^_a-z{|}~](\.?[\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
const regexNumber = new RegExp('[0-9]');
const regexLowercase = new RegExp('[a-z]');
const regexUppercase = new RegExp('[A-Z]');
const regexSpecial = new RegExp('[@#_]');
const regexOnly = new RegExp('^[0-9a-zA-Z@#$%]*$');


exports.validateEmail = (req, res, next) => {

    if (typeof req.body.email === ("undefined" || "null")) return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json(errorMsgHandler("UDF", HTTP_STATUS.UNPROCESSABLE_ENTITY, "Email Is Undefined"));

    if (RegExp(emailRegex).test(req.body.email)) return next();

    return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json(errorMsgHandler("INV", HTTP_STATUS.UNPROCESSABLE_ENTITY, "Invalid Email"));
}

exports.validatePassword = (req, res, next) => {

    // if (typeof req.body.password === ("undefined" || "null")) 

    if (req.body.password.length < 8) { req.errors.push(errorMsgGenerator(HTTP_STATUS.UNPROCESSABLE_ENTITY, "Password is Shorter than 8 characters")); };

    // if (req.body.password.length > 16) { req.errors.push(errorMsgGenerator(HTTP_STATUS.UNPROCESSABLE_ENTITY, "Password is Greater than 16 characters")); };

    if (!regexNumber.test(req.body.password)) { req.errors.push(errorMsgGenerator(HTTP_STATUS.UNPROCESSABLE_ENTITY, "Password need to have at least one number")); };

    if (!regexLowercase.test(req.body.password)) { req.errors.push(errorMsgGenerator(HTTP_STATUS.UNPROCESSABLE_ENTITY, "Password need to have at least one lowercase")); };

    if (!regexUppercase.test(req.body.password)) { req.errors.push(errorMsgGenerator(HTTP_STATUS.UNPROCESSABLE_ENTITY, "Password need to have at least one uppercase")); };

    if (!regexSpecial.test(req.body.password)) { req.errors.push(errorMsgGenerator(HTTP_STATUS.UNPROCESSABLE_ENTITY, "Password need to have at least one special character like @, #, $, %")); };

    if (!regexOnly.test(req.body.password)) { req.errors.push(errorMsgGenerator(HTTP_STATUS.UNPROCESSABLE_ENTITY, "Password must have number, uppercase, lowercase character and one special character like @, #, $, %")); };

    return next();
}