const jwt = require('jsonwebtoken');
const { errorMsgHandler } = require('../utils/errorHandler');

exports.accessTokenVerify = (req, res, next) => {
    if (!req.header('authorization')) {
        return res.status(404).json(errorMsgHandler("NOT_FOUND", 404, "Token Not Found"));
    }
    const accessToken = req.header('authorization');    
    try {
        const user = jwt.verify(accessToken.split(" ")[1].trim(), process.env.ACCESS_KEY);
        req.user = user;
        next();
    } catch (error) {
        return res.status(498).json(errorMsgHandler("INVALID", 498, "Invalid Token"));
    }

}