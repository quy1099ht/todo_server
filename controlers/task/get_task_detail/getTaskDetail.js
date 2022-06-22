const { getTaskDetailService, getTasksService } = require("../../../services/taskServices");
const { setOneErrMsg } = require("../../../utils/errorHandler");
const { successJsonFormat } = require("../../../utils/successHandler");

exports.getTaskDetail = async (req, res, next) => {
    let task = await getTaskDetailService(await getTasksService(req.user), req.params.id);

    if (!task) return setOneErrMsg(req, next, 404, "Task Not Found");

    return res.status(200).json(successJsonFormat(200, { task: task }, "Done"));
}