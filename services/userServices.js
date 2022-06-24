const User = require("../models/User");
const mongodb = require("mongodb");
const { MongoClient } = require('mongodb');
const Task = require("../models/Tasks");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { setOneErrMsg, badRequestErr } = require("../utils/errorHandler");
const { successJsonFormat } = require("../utils/successHandler");
const { uploadAvatarService: uploadPictureService } = require("./cloudinaryService");

const insertUserToDB = (res, data) => {
    User.create(data, () => {
        return res.status(200).json({
            message: "Your account is registered!"
        });
    })
}

exports.saltRound = 10;

exports.createNewUserService = (req, res) => {
    return insertUserToDB(res, {
        email: req.body.email,
        password: this.getHashedPasswordService(req.body.password),
        username: req.body.username,
        image: ""
    })
}

exports.getUserService = async (email) => {
    var user = await User.findOne({ email: email });
    return user;
}

exports.getHashedPasswordService = (data) => {
    const salt = bcrypt.genSaltSync(this.saltRound);
    const hashedPass = bcrypt.hashSync(data, salt);
    return hashedPass;
}

exports.getNewKeysService = (req) => {
    const accessToken = jwt.sign(req.body, process.env.ACCESS_KEY, { expiresIn: "1h" });
    const refreshToken = jwt.sign(req.body, process.env.REFRESH_KEY, { expiresIn: "7h" })
    return successJsonFormat(200, {
        accessToken: accessToken,
        refreshToken: refreshToken
    }, "Logged in successfully");
}

exports.emailExistedErr = (req, res, next) => {
    return setOneErrMsg(req, next, 400, "Email been used");
}

exports.getNewAccessKeyService = (req) => {
    try {
        accessToken = jwt.sign({ id: req.user.id, email: req.user.email }, process.env.ACCESS_KEY, { expiresIn: "1h" });
        return accessToken;
    } catch (err) {
        return undefined;
    }

}

exports.updateUserDetailService = async (req, res, next) => {
    if (!req.body.username) return badRequestErr(req, next);

    try {
        const a = await User.findByIdAndUpdate({ "_id": req.user.id }, { username: req.body.username });
        return res.status(200).json(successJsonFormat(200, {}, "Updated"));
    } catch (error) {
        return setOneErrMsg(req, next, "404", "User Not Found")
    }
}