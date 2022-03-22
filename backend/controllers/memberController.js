const asyncHandler = require('express-async-handler')
const Member = require('../models/memberModel.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const generateToken = require('../utils/generateToken.js')
const { cloudinary } = require('../utils/cloudinary')

//@des Get all Members for the page home
//@route /api/members
//@access Public
const getMembers = asyncHandler(async (req, res) => {
  const members = await Member.find({})
  const homeMember = members.map(({ name, position, image }) => ({
    name: name,
    position: position,
    image: image,
  }))
  res.status(200).json(homeMember)
  if (!members) {
    res.status(400)
    throw new Error('There no member in the team')
  }
})

//@des Register a new Member
//@route /api/members
//@access Public
const registerMember = asyncHandler(async (req, res) => {
  const { name, position, email, password, isAdmin, image } = req.body

  //Validation
  if (!name || !email || !position || !password) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  //Find if member already exists
  const memberExists = await Member.findOne({ email })
  if (memberExists) {
    res.status(401)
    throw new Error('Member already exists')
  }
  //Hash Password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const uploadedResponse = await cloudinary.uploader.upload(image, {
    upload_preset: 'task-manager',
  })

  //create member
  const member = await Member.create({
    name,
    email,
    position,
    isAdmin,
    password: hashedPassword,
    image: uploadedResponse.url,
  })
  if (member) {
    res.status(201).json({
      _id: member._id,
      name: member.name,
      email: member.email,
      position: member.position,
      isAdmin: member.isAdmin,
      image: uploadedResponse.url,
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
      isAdmin: member.isAdmin,
      image: member.image,
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

//@des Fetch all members by admin
//@route Get /api/members/all
//@access Private Admin

const getAllMembers = asyncHandler(async (req, res) => {
  const allMembers = await Member.find({}).select(['-password', '-image'])
  if (allMembers) {
    res.json(allMembers)
  } else {
    res.status(404)
    throw Error('Products Not Found')
  }
})

//@des Delete a member by admin
//@route DELETE /api/members/:id/admin
//@access Private admin
const deleteMember = asyncHandler(async (req, res) => {
  const member = await Member.findById(req.params.id)
  if (member) {
    await member.remove()
    res.json({ message: 'member Removed' })
  } else {
    res.status(404)
    throw Error('Product Not Found')
  }
})

//@des Create a member by admin
//@route POST /api/members/new
//@access Private admin
const createMember = asyncHandler(async (req, res) => {
  const { name, email, password, image, position, isAdmin } = req.body

  //Hash Password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const uploadedResponse = await cloudinary.uploader.upload(image, {
    upload_preset: 'task-manager',
  })

  //create member
  const member = await Member.create({
    name,
    email,
    position,
    isAdmin,
    password: hashedPassword,
    image: uploadedResponse.url,
  })
  if (member) {
    res.status(201).json({
      _id: member._id,
      name: member.name,
      email: member.email,
      position: member.position,
      isAdmin: member.isAdmin,
      image: uploadedResponse.url,
      token: generateToken(member._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid member data')
  }
})

// @desc    Update member profile by admin
// @route   PUT /api/members/:id/admin
// @access  Private-admin
export const updateMember = asyncHandler(async (req, res) => {
  const member = await Member.findById(req.params.id)

  if (member) {
    member.name = req.body.name || member.name
    member.email = req.body.email || member.email
    member.position = req.body.position || member.position
    member.isAdmin = req.body.isAdmin
    const updatedMember = await user.save()

    res.json({
      _id: updatedMember._id,
      name: updatedMember.name,
      email: updatedMember.email,
      position: updatedMember.position,
      isAdmin: updatedMember.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

module.exports = {
  registerMember,
  loginMember,
  getMe,
  getMembers,
  getAllMembers,
  deleteMember,
  createMember,
  updateMember,
}
