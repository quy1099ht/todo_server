const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const mongodb = require("mongodb");
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const { getUserService, getNewKeysService, emailExistedErr, createNewUserService } = require("../../services/userServices");
const { setOneErrMsg, errorMsgHandler } = require("../../utils/errorHandler");
const { addToBlacklist } = require("../../services/blacklistService");
const { successJsonFormat } = require("../../utils/successHandler");

const mails = ["a@gmail.com", "b@gmail.com", "barry@gmail.com"]

exports.register = async (req, res, next) => {
    var user = await getUserService(req.body.email);
    if (user != null) {
        return emailExistedErr(req, res, next);
    }
    else {
        return createNewUserService(req, res);
    }
}

exports.login = async (req, res, next) => {
    const user = await getUserService(req.body.email);
    if (!user) return setOneErrMsg(req, next, 422, "Email is wrong");

    if (!bcrypt.compareSync(req.body.password, user.password.trim())) return setOneErrMsg(req, next, 422, "Password is wrong");

    req.body.password = undefined;
    req.body.id = user.id;

    return res.status(200).json(getNewKeysService(req));
}

exports.getUser = async (req, res, next) => {
    const user = await getUserService(req.user.email);

    return res.status(200).json({
        user: user
    });
}

exports.logout = async (req, res, next) => {
    token = req.header('authorization').split(" ")[1];
    await addToBlacklist(token);
    return res.status(200).json(successJsonFormat(200, undefined, "Added To Blacklist"));
}

exports.updateUserDetail = (req, res, next) => {

}

exports.verify = (req, res, next) => {
    
}