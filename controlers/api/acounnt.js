const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const mongodb = require("mongodb");
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const { getUser, saltRound, getHashedPassword } = require("../../services/userServices");



const mails = ["a@gmail.com", "b@gmail.com", "barry@gmail.com"]

const emailExisted = (req, res, next) => {
    req.status = 400;
    req.errCode = "EXISTED";
    req.message = "The email is already been used";
    return next();
}

const createUser = (req, res) => {

    return insertUserToDB(res, {
        email: req.body.email,
        password: getHashedPassword(req.body.password),
        username: req.body.username,
        image: ""
    })

}

const insertUserToDB = (res, data) => {
    User.create(data, () => {
        return res.status(200).json({
            message: "Your account is registered!"
        });
    })
}

exports.register = async (req, res, next) => {
    var user = await getUser(req);
    if (user != null) {
        return emailExisted(req, res, next);
    }
    else {
        return createUser(req, res);
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
    

    const accessToken = jwt.sign(req.body, process.env.ACCESS_KEY, { expiresIn: "50m" });
    const refreshToken = jwt.sign(req.body, process.env.REFRESH_KEY, { expiresIn: "7h" })
    return res.status(200).json({
        status: 200,
        accessToken: accessToken,
        refreshToken: refreshToken
    });
}

exports.getUser = (req, res, next) => {
    return res.status(200).json({
        user: req.user
    });
}
