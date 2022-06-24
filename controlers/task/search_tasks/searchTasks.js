const { searchTitleService } = require("../../../services/taskServices");
const { errorMsgHandler } = require("../../../utils/errorHandler");
const { successJsonFormat } = require("../../../utils/successHandler");

exports.searchTitle = async (req, res, next) => {
    if(!req.query.keyword) return res.status(404).json(errorMsgHandler("", 404, "Not Found"));

    const searches = await searchTitleService(req.query.keyword);

    if (searches.length === 0) return res.status(404).json(errorMsgHandler("", 404, "Not Found"));

    return res.json(successJsonFormat(200, { searches: searches }, "Found"));
}