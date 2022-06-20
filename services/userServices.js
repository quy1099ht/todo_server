const User = require("../models/User");
const mongodb = require("mongodb");
const { MongoClient } = require('mongodb');
const Task = require("../models/Tasks");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { setOneErrMsg } = require("../utils/errorHandler");

const insertUserToDB = (res, data) => {
    User.create(data, () => {
        return res.status(200).json({
            message: "Your account is registered!"
        });
    })
}

exports.saltRound = 10;

exports.createNewUser = (req,res) => {
    return insertUserToDB(res, {
        email: req.body.email,
        password: this.getHashedPassword(req.body.password),
        username: req.body.username,
        image: ""
    })
}

exports.getUser = async (req) => {
    var user = await User.findOne({ email: req.body.email });
    return user;
}

exports.getHashedPassword = (data) => {
    const salt = bcrypt.genSaltSync(this.saltRound);
    console.log(salt);
    const hashedPass = bcrypt.hashSync(data, salt);
    return hashedPass;
}

exports.getNewKeys = (req) => {
    const accessToken = jwt.sign(req.body, process.env.ACCESS_KEY, { expiresIn: "50m" });
    const refreshToken = jwt.sign(req.body, process.env.REFRESH_KEY, { expiresIn: "7h" })
    return {
        status: 200,
        accessToken: accessToken,
        refreshToken: refreshToken
    };
}

exports.emailExisted = (req, res, next) => {
    return setOneErrMsg(req,next,400,"Email been used");
}