const bcrypt = require('bcrypt');
const { getUserService, getNewKeysService, emailExistedErr, createNewUserService, getNewAccessKeyService, updateUserDetailService } = require("../../services/userServices");
const { setOneErrMsg, errorMsgHandler, badRequestErr } = require("../../utils/errorHandler");
const { addToBlacklist } = require("../../services/blacklistService");
const { successJsonFormat } = require("../../utils/successHandler");
const { uploadAvatarService: uploadPictureService } = require("../../services/cloudinaryService");

const HTTP_STATUS = require("../../utils/enums/error_codes");
const { sendNewPassword } = require('../../utils/google_api/sendNewPassword');

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
    if (!user) return setOneErrMsg(req, next, HTTP_STATUS.UNPROCESSABLE_ENTITY, "Email is wrong");

    if (!bcrypt.compareSync(req.body.password, user.password.trim())) return setOneErrMsg(req, next, 422, "Password is wrong");

    req.body.password = undefined;
    req.body.id = user.id;

    return res.status(HTTP_STATUS.OK).json(getNewKeysService(req));
}

exports.getUser = async (req, res, next) => {
    const user = await getUserService(req.user.email);

    return res.status(HTTP_STATUS.OK).json(successJsonFormat(HTTP_STATUS.OK, { user: user }, "Done"));
}

exports.logout = async (req, res, next) => {
    token = req.header('authorization').split(" ")[1];
    await addToBlacklist(token);
    return res.status(HTTP_STATUS.OK).json(successJsonFormat(HTTP_STATUS.OK, undefined, "Added To Blacklist"));
}

exports.updateUserDetail = async (req, res, next) => {
    return updateUserDetailService(req, res, next);
}

exports.getNewAccessToken = (req, res, next) => {
    accessToken = getNewAccessKeyService(req);

    if (!accessToken) return res.status(HTTP_STATUS.BAD_REQUEST).json(errorMsgHandler("", HTTP_STATUS.BAD_REQUEST, "BAD_REQUEST"));

    return res.status(HTTP_STATUS.OK).json(successJsonFormat(HTTP_STATUS.OK, accessToken, ""));
}

exports.updateAvatar = (req, res, next) => {
    if (!req.files) return badRequestErr(req, next);

    return uploadPictureService(req.files.avatar.data, req.files.avatar.name, req, res, next);
}

exports.forgot_password = (req, res, next) => {
    sendNewPassword("nguyenlong0l2005@gmail.com","ssokcsakjadda"); 

    return res.status(HTTP_STATUS.ACCEPTED).json(successJsonFormat(HTTP_STATUS.ACCEPTED, undefined, "This feature is not yet implemented"));
}