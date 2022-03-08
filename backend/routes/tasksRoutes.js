const express = require('express')
const router = express.Router()
const {} = require('../controllers/taskController')
const { protect } = require('../middleware/authMiddleware.js')
const { getTasks, createTask } = require('../controllers/taskController')

router.route('/').get(protect, getTasks).post(protect, createTask)
// router.patch('/:id/edit', editTask)

module.exports = router
