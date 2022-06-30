const jwt = require('jsonwebtoken');
const { isExistToken } = require('../services/blacklistService');
const { getUserService } = require('../services/userServices');
const HTTP_STATUS = require('../utils/enums/error_codes');
const { errorMsgHandler, setOneErrMsg } = require('../utils/errorHandler');

exports.accessTokenVerify = async (req, res, next) => {
    if (!req.header('authorization')) {
        return res.status(HTTP_STATUS.NOT_FOUND).json(errorMsgHandler("NOT_FOUND", HTTP_STATUS.NOT_FOUND, "Token Not Found"));
    }
    const accessToken = req.header('authorization').split(" ")[1].trim();

    if (!await isExistToken(accessToken)) return res.status(HTTP_STATUS.UNAUTHORIZED).json(errorMsgHandler("TU", HTTP_STATUS.UNAUTHORIZED, "Token Unauthorized"));

    try {
        const user = jwt.verify(accessToken, process.env.ACCESS_KEY);

        let userDetail = await getUserService(user.email);
        //Temp way to handle my user not found
        if (!userDetail) return res.status(HTTP_STATUS.NOT_FOUND).json(errorMsgHandler("", HTTP_STATUS.NOT_FOUND, "User Not Found"));

        req.user = userDetail;
        return next();
    } catch (error) {
        return res.status(HTTP_STATUS.TOKEN_INVALID).json(errorMsgHandler("", HTTP_STATUS.TOKEN_INVALID, "Access Token Invalid"));
    }
}

exports.refreshTokenVerify = async (req, res, next) => {
    if (!req.header('authorization')) {
        return res.status(HTTP_STATUS.NOT_FOUND).json(errorMsgHandler("", HTTP_STATUS.NOT_FOUND, "Token Not Found"));
    }

    const refreshToken = req.header('authorization').split(" ")[1].trim();

    if (!await isExistToken(refreshToken)) return res.status(HTTP_STATUS.UNAUTHORIZED).json(errorMsgHandler("TU", HTTP_STATUS.UNAUTHORIZED, "Token Unauthorized"));

    try {
        const user = jwt.verify(refreshToken, process.env.REFRESH_KEY);
        req.user = user;
        return next();
    } catch (error) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json(errorMsgHandler("", HTTP_STATUS.UNAUTHORIZED, "Token Unauthorized"));
    }
}