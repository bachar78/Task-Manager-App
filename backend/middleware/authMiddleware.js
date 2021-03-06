const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Member = require('../models/memberModel.js')

const protect = asyncHandler(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      //Get token from header
      token = req.headers.authorization.split(' ')[1]

      //Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      //Get member from token
      req.member = await Member.findById(decoded.id).select('-password')
      next()
    } catch (error) {
        console.log(error)
        res.status(401)
        throw new Error('Not authorized')
    }
    }
    if (!token) {
        res.status(401)
        throw new Error('Not authorized')
    }
})

const admin = (req, res, next) => {
  if (req.member && req.member.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as admin')
  }

}
module.exports = {protect, admin}