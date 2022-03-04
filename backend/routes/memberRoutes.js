const express = require('express')
const router = express.Router()
const {
  registerMember,
  loginMember,
  getMe,
} = require('../controllers/memberController.js')
const {protect}  = require('../middleware/authMiddleware.js')

router.post('/', registerMember)
router.post('/login', loginMember)
router.get('/me', protect, getMe)

module.exports = router
