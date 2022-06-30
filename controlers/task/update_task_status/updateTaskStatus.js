const { getTaskDetailService, getTasksService, updateTaskStatusService } = require("../../../services/taskServices");
const HTTP_STATUS = require("../../../utils/enums/error_codes");
const { setOneErrMsg, badRequestErr } = require("../../../utils/errorHandler");
const { successJsonFormat } = require("../../../utils/successHandler");

exports.updateTaskStatus = async (req, res, next) => {
    let task = await getTaskDetailService(await getTasksService(req.user), req.params.id);

    if (!task) return setOneErrMsg(req, next, HTTP_STATUS.NOT_FOUND, "Product Not Found");

    if (!await updateTaskStatusService(task, req.body.progress)) return badRequestErr(req, next);

    return res.status(HTTP_STATUS.OK).json(successJsonFormat(HTTP_STATUS.OK, undefined, "Task's Status is updated"));
}
