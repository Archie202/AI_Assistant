const express = require('express');
const jwt = require('jsonwebtoken');
const Task = require('../models/Task');
const router = express.Router();

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send('Invalid token');
      }
      req.user = decoded;
      next();
    });
  } else {
    res.status(401).send('No token provided');
  }
};

// Create task
router.post('/tasks', verifyToken, async (req, res) => {
  try {
    const task = new Task({ ...req.body, user: req.user.id });
    await task.save();
    res.status(201).send('Task created');
  } catch (error) {
    res.status(500).send('Error creating task');
  }
});

// Fetch tasks
router.get('/tasks', verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).send('Error fetching tasks');
  }
});

// Update task
router.put('/tasks/:id', verifyToken, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!task) {
      return res.status(404).send('Task not found');
    }
    res.send('Task updated');
  } catch (error) {
    res.status(500).send('Error updating task');
  }
});

// Delete task
router.delete('/tasks/:id', verifyToken, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!task) {
      return res.status(404).send('Task not found');
    }
    res.send('Task deleted');
  } catch (error) {
    res.status(500).send('Error deleting task');
  }
});

module.exports = router;
