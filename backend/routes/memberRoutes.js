const express = require('express')
const router = express.Router()
const {
  registerMember,
  loginMember,
  getMe,
  getMembers,
} = require('../controllers/memberController.js')
const { protect } = require('../middleware/authMiddleware.js')

router.route('/').get(getMembers).post(registerMember)
router.post('/login', loginMember)
router.get('/me', protect, getMe)

module.exports = router
