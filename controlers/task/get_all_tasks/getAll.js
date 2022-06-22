const { getTasksService } = require("../../../services/taskServices");
const { badRequestErr, setOneErrMsg } = require("../../../utils/errorHandler");
const { successJsonFormat } = require("../../../utils/successHandler");

const integerRegex = "^[1-9][0-9]*$"

exports.getAllTask = async (req, res, next) => {
    let limit = 3;
    let page = 1;

    if (req.query.limit) { limit = req.query.limit; }

    if (req.query.page) { page = req.query.page; }

    if (!RegExp(integerRegex).test(req.query.page) || !RegExp(integerRegex).test(req.query.limit)) return badRequestErr(req, next);

    tasks = await getTasksService(req.user, limit, page);

    if (tasks.length === 0) return setOneErrMsg(req, next, 404, "Tasks Not Found");

    return res.status(200).json(successJsonFormat(200, { tasks: tasks }, "Tasks are found"));
}