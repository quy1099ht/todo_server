const { getTaskDetailService, getTasksService, updateTaskContentService } = require("../../../services/taskServices");
const { setOneErrMsg, badRequestErr } = require("../../../utils/errorHandler");
const { successJsonFormat } = require("../../../utils/successHandler");

exports.updateTaskContent = async (req, res, next) => {
    let task = await getTaskDetailService(await getTasksService(req.user), req.params.id);

    if (!task) return setOneErrMsg(req, next, 404, "Product Not Found");

    contents =  { title: req.body.taskTitle, content: req.body.taskContent } ;
    if (!await updateTaskContentService(task, contents)) return badRequestErr(req, next);

    return res.status(200).json(successJsonFormat(200, undefined, "Task's Content is updated"));
}