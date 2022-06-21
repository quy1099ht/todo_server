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
  progress : Number,
  state : String,
  createAt : Date,
  finishAt : Date
});

const Task = mongoose.model('Tasks',taskSchema);
module.exports = Task;