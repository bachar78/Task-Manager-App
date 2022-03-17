const express = require('express')
const router = express.Router({ mergeParams: true })
const { protect } = require('../middleware/authMiddleware')
const { getNotes, createNote, checkNote } = require('../controllers/noteController')

router.route('/').get(protect, getNotes).post(protect, createNote)
router.route('/:noteId').put(protect,checkNote)

module.exports = router

// /api/tasks/:taskId/note
