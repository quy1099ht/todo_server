const { getTasksService, addNewTaskService, getOneTaskService, updateTaskStatusService } = require("../../services/taskServices");
const { successJsonFormat } = require("../../utils/successHandler");



exports.get = async (req, res) => {
    return res.status(200).json(successJsonFormat(200, { tasks: await getTasksService(req.user) }, "Tasks are gotten"));
}
exports.getTaskDetail = async (req, res) => {
    return res.status(200).json(successJsonFormat(200, { task: await getOneTaskService(await getTasksService(req.user), req.params.id) }, "Done"));
}
exports.addTask = async (req, res) => {
    await addNewTaskService(req);
    return res.status(200).json(successJsonFormat(200, {}, "Done"));
}

exports.deleteTask = async (req, res) => {
    return res.status(200).json(successJsonFormat(200, {}, "Done"));
}

exports.updateTaskStatus = async (req, res) => {
    let task = await getOneTaskService(await getTasksService(req.user), req.params.id);
    updateTaskStatusService(task,30);
    return res.status(200).json(successJsonFormat(200, {}, "Done"));
}

exports.updateTaskContent = (req, res) => {
    
    return res.status(200).json(successJsonFormat(200, {}, "Done"));
}