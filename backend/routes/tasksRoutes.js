const express = require('express')
const router = express.Router()
const { protect, admin } = require('../middleware/authMiddleware.js')
const noteRouter = require('./noteRoutes')

// Re-route into note router
router.use('/:taskId/notes', noteRouter)
const {
  getTasks,
  createTask,
  getTask,
  deleteTask,
  updateTask,
  getAllTasks,
  updateTaskByAdmin,
  deleteTaskByAdmin,
} = require('../controllers/taskController')

router.route('/').get(protect, getTasks).post(protect, createTask)
router
  .route('/:taskId')
  .get(protect, getTask)
  .delete(protect, deleteTask)
  .put(protect, updateTask)
router.route('/all').get(protect, admin, getAllTasks)
router
  .route('/:taskId/admin')
  .delete(protect, admin, deleteTaskByAdmin)
  .put(protect, admin, updateTaskByAdmin)

module.exports = router
