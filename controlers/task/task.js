const Tasks = require("../../models/Tasks")
const mongodb = require("mongodb")
const { MongoClient } = require('mongodb');
const { getTasks } = require("../../services/taskServices");
const { successJsonFormat } = require("../../utils/successHandler");
const User = require("../../models/User");
const { getUser } = require("../../services/userServices");

exports.get = function (req, res) {
    console.log(req.user);
    return res.status(200).json(successJsonFormat(200, getTasks(req.user), "Get Tasks"));
}
exports.addTask = async (req, res) => {
    let user = await getUser(req.user.email); 

    return res.status(200).json(successJsonFormat(200, {}, "Done"));
}
exports.updateTaskStatus = async (req, res) => {
    return res.status(200).json(successJsonFormat(200, {}, "Done"));
}
exports.deleteTask = async (req, res) => {
    return res.status(200).json(successJsonFormat(200, {}, "Done"));
}
exports.completeTask = async (req, res) => {
    return res.status(200).json(successJsonFormat(200, {}, "Done"));
}