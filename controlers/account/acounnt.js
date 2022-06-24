const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const mongodb = require("mongodb");
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const { getUserService, getNewKeysService, emailExistedErr, createNewUserService, getNewAccessKeyService, updateUserDetailService } = require("../../services/userServices");
const { setOneErrMsg, errorMsgHandler, badRequestErr } = require("../../utils/errorHandler");
const { addToBlacklist } = require("../../services/blacklistService");
const { successJsonFormat } = require("../../utils/successHandler");
const { uploadAvatarService: uploadPictureService } = require("../../services/cloudinaryService");

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

    return res.status(200).json(successJsonFormat(200, { user: user }, "Done"));
}

exports.logout = async (req, res, next) => {
    token = req.header('authorization').split(" ")[1];
    await addToBlacklist(token);
    return res.status(200).json(successJsonFormat(200, undefined, "Added To Blacklist"));
}

exports.updateUserDetail = async (req, res, next) => {
    return updateUserDetailService(req, res, next);
}

exports.getNewAccessToken = (req, res, next) => {
    accessToken = getNewAccessKeyService(req);

    if (!accessToken) return res.status(200).json(errorMsgHandler("", 400, "BAD_REQUEST"));

    return res.status(200).json(successJsonFormat(200, accessToken, ""));
}

exports.updateAvatar = (req, res, next) => {
    if (!req.files) return badRequestErr(req, next);

    return uploadPictureService(req.files.avatar.data, req.files.avatar.name, req, res, next);
}