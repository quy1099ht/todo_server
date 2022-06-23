const { cloudinary } = require("../utils/cloudinary");
const streamifier = require("streamifier");

exports.uploadAvatarService = (fileBuffer) => {
    console.log(fileBuffer);
    cloudinary.uploader.upload_stream({ upload_preset: "ml_default" }, (err, result) => { if (err) console.log(err); else {console.log(result);}}).end(fileBuffer);
}