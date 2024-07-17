const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { interactWithAI } = require('../controllers/aiController');

// Route to interact with AI
router.post('/interact', authMiddleware, interactWithAI);

module.exports = router;
