const User = require("../models/User");
const mongodb = require("mongodb");
const { MongoClient } = require('mongodb');
const Task = require("../models/Tasks");
const bcrypt = require('bcrypt');

exports.saltRound = 10;

exports.createNewUser = () => {

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