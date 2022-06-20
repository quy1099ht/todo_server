const Tasks = require("../../models/Tasks")
const mongodb = require("mongodb")
const { MongoClient } = require('mongodb');
const { getTasks } = require("../../services/taskServices");

exports.get = function (req, res) {
    console.log(req.user);
    return res.status(200).json(getTasks(req.user));
}
exports.addTask = (req, res) => {
    Tasks.create({
        userId: req.user.id,
        title: req.body.taskTitle,
        content: req.body.taskContent,
        state: "Not Done"
    })
    return res.json({
        isAdded: true
    })
}
exports.updateTaskStatus = (req, res) => {

}
exports.deleteTask = async (req, res) => {
    // console.log(req.body);
    const a = await Tasks.findOne({
        _id: req.body.taskId
    })

    const b = await Tasks.findOneAndDelete({
        _id: mongodb.ObjectId(req.body.taskId)
    })


    return res.status(200).json({
        // isDeleted: true
    });
}
exports.completeTask = (req, res) => {

    Tasks.findOneAndUpdate({
        name: req.body.taskname
    }, {
        // isCompleted: true
    }, (err) => {
        if (err) {

        }
        console.log("Worked!");
        return res.json({
            // isCompleted: true
        })
    })

}

exports.sample = (req, res) => {
    return res.json(getAllWeather())
}