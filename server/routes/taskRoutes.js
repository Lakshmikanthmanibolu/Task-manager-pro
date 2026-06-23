const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  toggleTask,
  deleteCompletedTasks,
  getTaskStats,
} = require('../controllers/taskController');
const { protect } = require('../middleware/auth');
const { validateTask } = require('../middleware/validate');

// All routes are protected
router.use(protect);

// Stats route (must be before /:id to avoid conflict)
router.get('/stats', getTaskStats);

// Delete completed tasks (must be before /:id)
router.delete('/completed', deleteCompletedTasks);

// Task CRUD
router.route('/').get(getTasks).post(validateTask, createTask);
router.route('/:id').get(getTask).put(updateTask).delete(deleteTask);

// Toggle completion
router.patch('/:id/toggle', toggleTask);

module.exports = router;
