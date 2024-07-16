// backend/routes/tasks.js
const router = require('express').Router();
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/tasks');
const auth = require('../middleware/auth');

router.post('/', auth, createTask);
router.get('/', auth, getTasks);
router.put('/:id', auth, updateTask);
router.delete('/:id', auth, deleteTask);

module.exports = router;
