const { deleteTaskService } = require("../../../services/taskServices");
const { badRequestErr } = require("../../../utils/errorHandler");
const { successJsonFormat } = require("../../../utils/successHandler");

exports.deleteTask = async (req, res, next) => {
    if(!await deleteTaskService(req.params.id)) return badRequestErr(req,next);
    
    return res.status(200).json(successJsonFormat(200, undefined, "Done"));
}
