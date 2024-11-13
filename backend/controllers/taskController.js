const Task = require("../models/task");

exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, deadline } = req.body;
    const task = new Task({
      title,
      description,
      priority,
      deadline,
      userId: req.user.userId,
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Task creation failed" });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Fetching tasks failed" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.taskId, req.body, {
      new: true,
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Task update failed" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.taskId);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: "Task deletion failed" });
  }
};
