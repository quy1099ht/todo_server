const { getTaskDetailService, getTasksService, updateTaskStatusService } = require("../../../services/taskServices");
const { setOneErrMsg, badRequestErr } = require("../../../utils/errorHandler");
const { successJsonFormat } = require("../../../utils/successHandler");

exports.updateTaskStatus = async (req, res, next) => {
    let task = await getTaskDetailService(await getTasksService(req.user), req.params.id);

    if (!task) return setOneErrMsg(req, next, 404, "Product Not Found");

    if (!await updateTaskStatusService(task, req.body.progress)) return badRequestErr(req, next);

    return res.status(200).json(successJsonFormat(200, undefined, "Task's Status is updated"));
}
