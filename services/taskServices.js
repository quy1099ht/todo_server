const User = require("../models/User");
const mongodb = require("mongodb");
const { MongoClient } = require('mongodb');
const Task = require("../models/Tasks");
const bcrypt = require('bcrypt');

exports.getTasksService = async (user) => {
    const tasks = await Task.find({ userId: user.id });
    return tasks;
}

exports.getOneTaskService = (tasks, id) => {
    tasks = tasks.filter((value)=>value.id === id);
    return tasks[0];
}

exports.addNewTaskService = async (req) => {
    await Task.create({
        userId: req.user.id,
        title: req.body.taskTitle,
        content: req.body.taskContent,
        progress: 0,
        state: "Not Done",
        createAt: new Date(Date.now()),
        finishAt: null
    })
}

exports.deleteTaskService = async (id) => {
    await Task.deleteOne({ "_id": id });
}

exports.updateTaskStatusService = async (task, taskProgress) => {
    let updatePart = {
        progress: taskProgress,
        state: "In Progress",
    }
    console.log(updatePart);
    // await Task.findByIdAndUpdate(task.id, updatePart);
}

