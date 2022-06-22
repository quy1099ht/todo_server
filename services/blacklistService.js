const Blacklist = require("../models/Blacklist");

exports.isExistToken = async (token) =>{
    token = await Blacklist.find({token : token});
    
    if(!token) return false;

    return true; 
}