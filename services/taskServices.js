const User = require("../models/User");
const mongodb = require("mongodb");
const { MongoClient } = require('mongodb');
const Task = require("../models/Tasks");
const bcrypt = require('bcrypt');

//Done
exports.getTasksService = async (user, limit, page) => {
    const tasks = await Task.find({ userId: user.id }).limit(limit).skip(limit * (page - 1));
    return tasks;
}

//Done
exports.getTaskDetailService = (tasks, id) => {
    tasks = tasks.filter((value) => value.id === id);
    return tasks[0];
}

exports.isExistedTask = (tasks, taskTitle) => {
    if (!taskTitle) return false;

    tasks = tasks.filter((element) => element.title === taskTitle);

    if (tasks.length > 0) return true;

    return false;
}

//Done
exports.addNewTaskService = async (req) => {
    let taskTitle = req.body.taskTitle;
    let taskContent = req.body.taskContent;

    if (!taskTitle) return false;

    if (!taskContent) { taskContent = " "; }

    await Task.create({
        userId: req.user.id,
        title: taskTitle,
        content: taskContent,
        progress: 0,
        state: "Not Done",
        createAt: new Date(Date.now()),
        finishAt: null
    })
    return true;
}

exports.deleteTaskService = async (id) => {
    await Task.deleteOne({ "_id": id });
}

//Done
exports.updateTaskStatusService = async (task, progress) => {
    if (!progress) return false;

    if (progress < 0) return false;

    let state = "";
    let finishAt = null;

    if (progress === 0) state = "New";

    if (progress > 0 && progress < 100) state = "In Progress";

    if (progress >= 100) { progress = 100; state = "Finish"; finishAt = new Date(Date.now()); }

    await Task.findByIdAndUpdate(task.id, {
        progress: progress,
        state: state,
        finishAt: finishAt
    });

    return true;
}

exports.updateTaskContentService = async (task, contents) => {
    console.log(contents.title);
    if (!contents) return false;
    
    if (!contents.title) return false;

    if (!contents.content) return false;

    await Task.findByIdAndUpdate(task.id, {
        title: contents.title,
        content: contents.content
    });
    return true;
}