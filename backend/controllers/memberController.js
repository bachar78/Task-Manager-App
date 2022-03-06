const asyncHandler = require('express-async-handler')
const Member = require('../models/memberModel.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const generateToken = require('../utils/generateToken.js')

//@des Register a new Member
//@route /api/members
//@access Public
const registerMember = asyncHandler(async (req, res) => {
  const { name, position, email, password, isAdmin } = req.body

  //Validation
  if (!name || !email || !position || !password) {
    res.status(400)
    throw new Error('Please include all fields')
  }
  
  //Find if member already exists
  const memberExists = await Member.findOne({ email })
  if (memberExists) {
    res.status(400)
    throw new Error('Member already exists')
  }
  //Hash Password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  //create member
  const member = await Member.create({
    name,
    email,
    position,
    isAdmin,
    password: hashedPassword,
  })
  if (member) {
    res.status(201).json({
      _id: member._id,
      name: member.name,
      email: member.email,
      position: member.position,
      token: generateToken(member._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid member data')
  }
})

//@des Login a Member
//@route /api/members/login
//@access Public

const loginMember = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const member = await Member.findOne({ email })

  //check member and password mach
  if (member && (await bcrypt.compare(password, member.password))) {
    res.status(200).json({
      _id: member._id,
      name: member.name,
      email: member.email,
      position: member.position,
      token: generateToken(member._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid credentials')
  }
})

//@des Get current member
//@route /api/members/me
//@access Private

const getMe = asyncHandler(async (req, res) => {
  const member = {
    id: req.member._id,
    name: req.member.name,
    email: req.member.email,
    position: req.member.position,
  }
  res.status(200).json(member)
})

module.exports = {
  registerMember,
  loginMember,
  getMe,
}
