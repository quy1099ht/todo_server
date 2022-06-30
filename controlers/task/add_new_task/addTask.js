const { getTasksService, isExistedTask, addNewTaskService } = require("../../../services/taskServices");
const { setOneErrMsg, badRequestErr } = require("../../../utils/errorHandler");
const { successJsonFormat } = require("../../../utils/successHandler");
const { HTTP_STATUS } = require("../../../utils/enums/error_codes")
exports.addTask = async (req, res, next) => {
    if (isExistedTask(await getTasksService(req.user), req.body.taskTitle)) return setOneErrMsg(req, next, 409, "Task Title Existed");

    if (!await addNewTaskService(req)) return badRequestErr(req, next);

    return res.status(HTTP_STATUS.OK).json(successJsonFormat(HTTP_STATUS.OK, undefined, "Added"));
}
