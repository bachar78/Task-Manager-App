const express = require('express')
const router = express.Router()
const {} = require('../controllers/taskController')
const { protect } = require('../middleware/authMiddleware.js')
const {
  getTasks,
  createTask,
  getTask,
  deleteTask,
  updateTask,
} = require('../controllers/taskController')

router.route('/').get(protect, getTasks).post(protect, createTask)
router.route('/:id').get(protect, getTask).delete(protect, deleteTask).put(protect, updateTask)


module.exports = router
