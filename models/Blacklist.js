const mongoose = require("mongoose");
const { Schema } = mongoose;
const reqString = {
  type: String,
  required: true
}

const blacklistSchema = new Schema({
  token : reqString  
});

const Blacklist = mongoose.model('Blacklist',blacklistSchema);
module.exports = Blacklist;