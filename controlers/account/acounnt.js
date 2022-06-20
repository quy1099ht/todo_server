const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const mongodb = require("mongodb");
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const { getUser, saltRound, getHashedPassword, getNewKeys, emailExisted, createNewUser } = require("../../services/userServices");

const mails = ["a@gmail.com", "b@gmail.com", "barry@gmail.com"]

exports.register = async (req, res, next) => {
    var user = await getUser(req);
    if (user != null) {
        return emailExisted(req, res, next);
    }
    else {
        return createNewUser(req, res);
    }
}

exports.login = async (req, res, next) => {
    const user = await getUser(req);
    console.log(user.id);

    if (!bcrypt.compareSync(req.body.password, user.password.trim())) {

        return next();
    }

    req.body.password = undefined;

    req.body.id = user.id;

    return res.status(200).json(getNewKeys(req));
}

exports.getUser = (req, res, next) => {
    return res.status(200).json({
        user: req.user
    });
}
