const { deleteTaskService } = require("../../../services/taskServices");
const HTTP_STATUS = require("../../../utils/enums/error_codes");
const { badRequestErr } = require("../../../utils/errorHandler");
const { successJsonFormat } = require("../../../utils/successHandler");

exports.deleteTask = async (req, res, next) => {
    if (!await deleteTaskService(req.params.id)) return badRequestErr(req, next);

    return res.status(HTTP_STATUS.OK).json(successJsonFormat(HTTP_STATUS.OK, undefined, "Done"));
}
