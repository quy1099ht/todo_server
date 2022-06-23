const { cloudinary } = require("../utils/cloudinary");
const streamifier = require("streamifier");
const { successJsonFormat } = require("../utils/successHandler");

exports.uploadAvatarService = (fileBuffer,req,res) => {
    cloudinary.uploader.upload_stream({ upload_preset: "ml_default" }, (err, result) => {
        if (err) console.log(err);
        else {
            return res.status(200).json(successJsonFormat(200,result.url,"Updated"))
        }
    }).end(fileBuffer);
}