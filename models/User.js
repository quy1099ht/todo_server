const mongoose = require("mongoose");
const { Schema } = mongoose;
const reqString = {
  type: String,
  required: true
}

const userSchema = new Schema({
  email : reqString,
  password : reqString,
  username : reqString,
  image : {
    type : String
  }
  
});

const User = mongoose.model('Users',userSchema);
module.exports = User;