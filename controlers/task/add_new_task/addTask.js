const { getTasksService, isExistedTask, addNewTaskService } = require("../../../services/taskServices");
const { setOneErrMsg, badRequestErr } = require("../../../utils/errorHandler");
const { successJsonFormat } = require("../../../utils/successHandler");

exports.addTask = async (req, res, next) => {
    if (isExistedTask(await getTasksService(req.user), req.body.taskTitle)) return setOneErrMsg(req, next, 409, "Task Title Existed");

    if (!await addNewTaskService(req)) return badRequestErr(req, next);

    return res.status(200).json(successJsonFormat(200, undefined, "Added"));
}
