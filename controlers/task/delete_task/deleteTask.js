const { deleteTaskService } = require("../../../services/taskServices");
const { successJsonFormat } = require("../../../utils/successHandler");

exports.deleteTask = async (req, res, next) => {
    deleteTaskService("62b2db6c48eb7dad828d7de6")
    return res.status(200).json(successJsonFormat(200, undefined, "Done"));
}
