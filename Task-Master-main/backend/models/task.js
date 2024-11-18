const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  description: String,
  priority: { type: String, enum: ["low", "medium", "high"] },
  deadline: Date,
});

module.exports = mongoose.model("Task", taskSchema);
