// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/ai-assistant', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const taskSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  name: String,
  description: String,
  reminder: Date,
  completed: Boolean,
});

const User = mongoose.model('User', userSchema);
const Task = mongoose.model('Task', taskSchema);

const secret = 'mysecret';

// Authentication middleware
const auth = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).send('Access denied. No token provided.');
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};

// Register route
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  const token = jwt.sign({ _id: user._id }, secret);
  res.send({ token });
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('Invalid email or password.');
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');
  const token = jwt.sign({ _id: user._id }, secret);
  res.send({ token });
});

// Create task route
app.post('/tasks', auth, async (req, res) => {
  const { name, description, reminder } = req.body;
  const task = new Task({ userId: req.user._id, name, description, reminder, completed: false });
  await task.save();
  res.send(task);
});

// Get tasks route
app.get('/tasks', auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.user._id });
  res.send(tasks);
});

// Update task route
app.put('/tasks/:id', auth, async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(task);
});

// Delete task route
app.delete('/tasks/:id', auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.send({ message: 'Task deleted' });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
