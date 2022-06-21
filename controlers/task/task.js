const { getTasksService, addNewTaskService, getTaskDetailService, updateTaskStatusService } = require("../../services/taskServices");
const { setOneErrMsg } = require("../../utils/errorHandler");
const { successJsonFormat } = require("../../utils/successHandler");



exports.get = async (req, res, next) => {
    return res.status(200).json(successJsonFormat(200, { tasks: await getTasksService(req.user) }, "Tasks are found"));
}
exports.getTaskDetail = async (req, res, next) => {
    let task = await getTaskDetailService(await getTasksService(req.user), req.params.id);

    if (typeof task == "undefined") return setOneErrMsg(req, next, 404, "Task Not Found");

    return res.status(200).json(successJsonFormat(200, { task: task }, "Done"));
}
exports.addTask = async (req, res, next) => {
    await addNewTaskService(req);
    return res.status(200).json(successJsonFormat(200, {}, "Done"));
}

exports.deleteTask = async (req, res, next) => {
    return res.status(200).json(successJsonFormat(200, {}, "Done"));
}

exports.updateTaskStatus = async (req, res, next) => {
    let task = await getTaskDetailService(await getTasksService(req.user), req.params.id);

    if(!await updateTaskStatusService(task, req.body.progress)) return setOneErrMsg(req, next, 400, "Bad Request");

    return res.status(200).json(successJsonFormat(200, {}, ""));
}

exports.updateTaskContent = (req, res, next) => {
    return res.status(200).json(successJsonFormat(200, {}, "Task's Content is updated"));
}