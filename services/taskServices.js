const User = require("../models/User");
const mongodb = require("mongodb");
const { MongoClient } = require('mongodb');
const Task = require("../models/Tasks");
const bcrypt = require('bcrypt');

exports.getTasksService = async (user) => {
    const tasks = await Task.find({ userId: user.id });
    return tasks;
}

exports.getTaskDetailService = (tasks, id) => {
    tasks = tasks.filter((value) => value.id === id);
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

exports.updateTaskStatusService = async (task, progress) => {
    if(typeof progress === "undefined") return false;

    if(typeof progress === null) return false;

    if(progress < 0) return false;

    if (typeof task == "undefined") return false;

    let state = "";
    let finishAt = null;
    
    if (progress === 0) state = "New";
    if (progress > 0 && progress < 100) state = "In Progress"
    if (progress >= 100) { progress = 100; state = "Finish"; finishAt = new Date(Date.now()); }
    
    await Task.findByIdAndUpdate(task.id, {
        progress: progress,
        state: state,
        finishAt: finishAt
    });

    return true;
}

