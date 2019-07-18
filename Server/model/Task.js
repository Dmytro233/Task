const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  ownerId: { type: Schema.Types.ObjectId, ref: "user" },
  name: String,
  description: String,
  userEmailsWithAccess: Array
});

const Task = mongoose.model("task", TaskSchema);

module.exports = Task;
