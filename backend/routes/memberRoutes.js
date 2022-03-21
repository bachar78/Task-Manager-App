const express = require('express')
const router = express.Router()
const {
  registerMember,
  loginMember,
  getMe,
  getMembers,
  getAllMembers,
  deleteMember,
  createMember,
} = require('../controllers/memberController.js')
const { protect, admin } = require('../middleware/authMiddleware.js')

router.route('/').get(getMembers).post(registerMember)
router.post('/login', loginMember)
router.get('/me', protect, getMe)
router.route('/all').get(protect, admin, getAllMembers)
router
  .route('/:id/admin')
  .delete(protect, admin, deleteMember)
  .post(protect, admin, createMember)

module.exports = router
