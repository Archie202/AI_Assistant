require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error: ', err));

// Routes
app.use('/auth', authRoutes);
app.use('/api', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
