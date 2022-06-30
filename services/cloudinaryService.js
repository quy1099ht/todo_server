const { cloudinary } = require("../utils/cloudinary");
const streamifier = require("streamifier");
const { successJsonFormat } = require("../utils/successHandler");
const { setOneErrMsg, errorMsgHandler, badRequestErr } = require("../utils/errorHandler");
const User = require("../models/User");
const HTTP_STATUS = require("../utils/enums/error_codes");

const uploadToCloundinary = (fileBuffer, fileName, req, res) => {
    cloudinary.uploader.upload_stream({ upload_preset: "ml_default", filename_override: fileName }, (err, result) => {
        if (err) return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(errorMsgHandler("", HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error"));
        else {
            User.findByIdAndUpdate({ "_id": req.user.id }, { image: result.url }, (err, resul) => {
                if (err) return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(errorMsgHandler("", HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error"));
                return res.status(HTTP_STATUS.OK).json(successJsonFormat(HTTP_STATUS.OK, result.url, "Avatar Updated"))
            });
        }
    }).end(fileBuffer);
}

exports.uploadAvatarService = async (fileBuffer, fileName, req, res, next) => {
    let img = null;
    try {
        img = await fetch(req.user.image);
        let imgBuffer = Buffer.from(await img.arrayBuffer());

        if ((imgBuffer.byteLength > 0) === false) return uploadToCloundinary(fileBuffer, fileName, req, res);

        if (Buffer.compare(imgBuffer, fileBuffer) === 0) return badRequestErr(req, next);
    } catch (error) { }
    return uploadToCloundinary(fileBuffer, fileName, req, res);
}