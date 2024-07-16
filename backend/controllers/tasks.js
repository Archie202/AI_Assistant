// backend/controllers/tasks.js
const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  const { name, description, reminder } = req.body;
  const task = new Task({ name, description, reminder, userId: req.user._id });
  await task.save();
  res.send(task);
};

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user._id });
  res.send(tasks);
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
  res.send(task);
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.send({ message: 'Task deleted' });
};
