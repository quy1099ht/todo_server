const jwt = require('jsonwebtoken');
const { isExistToken } = require('../services/blacklistService');
const { getUserService } = require('../services/userServices');
const { errorMsgHandler, setOneErrMsg } = require('../utils/errorHandler');

exports.accessTokenVerify = async (req, res, next) => {
    if (!req.header('authorization')) {
        return res.status(404).json(errorMsgHandler("NOT_FOUND", 404, "Token Not Found"));
    }
    const accessToken = req.header('authorization').split(" ")[1].trim();

    if (!await isExistToken(accessToken)) return res.status(404).json(errorMsgHandler("TU", 401, "Token Unauthorized"));

    try {
        const user = jwt.verify(accessToken, process.env.ACCESS_KEY);

        //Temp way to handle my user not found
        if (! await getUserService(user.email)) return res.status(404).json(errorMsgHandler("", 404, "User Not Found"));

        req.user = user;
        return next();
    } catch (error) {
        return res.status(498).json(errorMsgHandler("", 498, "Access Token Invalid"));
    }
}

exports.refreshTokenVerify = async (req, res, next) => {
    if (!req.header('authorization')) {
        return res.status(404).json(errorMsgHandler("", 404, "Token Not Found"));
    }

    const refreshToken = req.header('authorization').split(" ")[1].trim();
   
    if (!await isExistToken(refreshToken)) return res.status(404).json(errorMsgHandler("TU", 401, "Token Unauthorized"));

    try {
        const user = jwt.verify(refreshToken, process.env.REFRESH_KEY);
        req.user = user;
        return next();
    } catch (error) {
        return res.status(498).json(errorMsgHandler("", 401, "Token Unauthorized"));
    }
}