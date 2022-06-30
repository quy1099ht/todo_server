const { getTaskDetailService, getTasksService } = require("../../../services/taskServices");
const HTTP_STATUS = require("../../../utils/enums/error_codes");
const { setOneErrMsg } = require("../../../utils/errorHandler");
const { successJsonFormat } = require("../../../utils/successHandler");

exports.getTaskDetail = async (req, res, next) => {
    let task = await getTaskDetailService(await getTasksService(req.user), req.params.id);

    if (!task) return setOneErrMsg(req, next, HTTP_STATUS.NOT_FOUND, "Task Not Found");

    return res.status(HTTP_STATUS.OK).json(successJsonFormat(HTTP_STATUS.OK, { task: task }, "Done"));
}