const { getTaskDetailService, getTasksService, updateTaskContentService } = require("../../../services/taskServices");
const HTTP_STATUS = require("../../../utils/enums/error_codes");
const { setOneErrMsg, badRequestErr } = require("../../../utils/errorHandler");
const { successJsonFormat } = require("../../../utils/successHandler");

exports.updateTaskContent = async (req, res, next) => {
    let task = await getTaskDetailService(await getTasksService(req.user), req.params.id);

    if (!task) return setOneErrMsg(req, next, HTTP_STATUS.NOT_FOUND, "Product Not Found");

    contents = { title: req.body.taskTitle, content: req.body.taskContent };
    if (!await updateTaskContentService(task, contents)) return badRequestErr(req, next);

    return res.status(HTTP_STATUS.OK).json(successJsonFormat(HTTP_STATUS.OK, undefined, "Task's Content is updated"));
}