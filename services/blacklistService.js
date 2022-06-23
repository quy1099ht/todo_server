const Blacklist = require("../models/Blacklist");

exports.isExistToken = async (token) =>{
    token = await Blacklist.find({token : token});
    
    if(!token || token.length < 1) return false;

    return true; 
}