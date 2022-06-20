const User = require("../models/User");
const mongodb = require("mongodb");
const { MongoClient } = require('mongodb');
const Task = require("../models/Tasks");
const bcrypt = require('bcrypt');

exports.getTasks = async (user) => {
    const tasks = await Task.find({ userId: user.id });
    return tasks;
}

exports.addNewTask = async () => {
    await Task.create({
        userId: req.user.id,
        title: req.body.taskTitle,
        content: req.body.taskContent,
        state: "Not Done"
    })
}

exports.updateTaskStatus = async (task,taskStatus) => {
    await Task.findByIdAndUpdate(task.id, {
        ...task,
        state : taskStatus
    });
}

