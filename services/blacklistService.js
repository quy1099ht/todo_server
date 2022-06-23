const Blacklist = require("../models/Blacklist");

exports.isExistToken = async (token) => {
   
    let token1 = await Blacklist.findOne({ token });

    if (token1) return false;

    return true;
}

exports.addToBlacklist = async (token) => {
    if (!token) return false;

    await Blacklist.create({ token });
    
    return true;
}