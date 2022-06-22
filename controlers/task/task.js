const { getTasksService, addNewTaskService, getTaskDetailService, updateTaskStatusService, isExistedTask } = require("../../services/taskServices");
const { setOneErrMsg } = require("../../utils/errorHandler");
const { successJsonFormat } = require("../../utils/successHandler");

const integerRegex = "^[1-9][0-9]*$"


exports.get = async (req, res, next) => {
    let limit = 3;
    let page = 1;

    if (req.query.limit) { limit = req.query.limit; }

    if (req.query.page) { page = req.query.page; }

    if(!RegExp(integerRegex).test(req.query.page) || !RegExp(integerRegex).test(req.query.limit)) return setOneErrMsg(req, next, 400, "BAD_REQUEST"); 

    tasks = await getTasksService(req.user, limit, page);

    if (tasks.length === 0) return setOneErrMsg(req, next, 404, "Tasks Not Found");

    return res.status(200).json(successJsonFormat(200, { tasks: tasks }, "Tasks are found"));
}

exports.getTaskDetail = async (req, res, next) => {
    let task = await getTaskDetailService(await getTasksService(req.user), req.params.id);

    if (typeof task === "undefined") return setOneErrMsg(req, next, 404, "Task Not Found");

    return res.status(200).json(successJsonFormat(200, { task: task }, "Done"));
}

exports.addTask = async (req, res, next) => {
    if (isExistedTask(await getTasksService(req.user), req.body.taskTitle)) return setOneErrMsg(req, next, 409, "Task Title Existed");

    if (!await addNewTaskService(req)) return setOneErrMsg(req, next, 400, "BAD_REQUEST");

    return res.status(200).json(successJsonFormat(200, undefined, "Done"));
}

exports.deleteTask = async (req, res, next) => {
    return res.status(200).json(successJsonFormat(200, undefined, "Done"));
}

exports.updateTaskStatus = async (req, res, next) => {
    let task = await getTaskDetailService(await getTasksService(req.user), req.params.id);

    if (!await updateTaskStatusService(task, req.body.progress)) return setOneErrMsg(req, next, 400, "BAD_REQUEST");

    return res.status(200).json(successJsonFormat(200, undefined, "Task's Status is updated"));
}

exports.updateTaskContent = (req, res, next) => {

    return res.status(200).json(successJsonFormat(200, undefined, "Task's Content is updated"));
}