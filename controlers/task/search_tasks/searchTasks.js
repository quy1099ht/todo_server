const { searchTitleService } = require("../../../services/taskServices");

exports.searchTitle = async (req, res, next) => {
    searchTitleService("3");
    return res.json({});
}