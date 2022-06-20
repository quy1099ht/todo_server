const mongoose = require("mongoose");
const { Schema } = mongoose;
const reqString = {
  type: String,
  required: true
}

const taskSchema = new Schema({
  userId : String,
  title : reqString,
  content : reqString,
  state : String
});

const Task = mongoose.model('Tasks',taskSchema);
module.exports = Task;