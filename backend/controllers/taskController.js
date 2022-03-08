const asyncHandler = require('express-async-handler')
const Member = require('../models/memberModel')
const Task = require('../models/taskModel')

//@des Get member tasks
//@route GET /api/tasks
//@access Private

const getTasks = asyncHandler(async (req, res) => {
  //get member
  const member = await Member.findById(req.member.id)
  if (!member) {
    res.status(401)
    throw new Error('Member not found')
  }
  const tasks = await Task.find({ member: req.member.id })
  res.status(200).json(tasks)
})

//@des Get member tasks
//@route POST /api/tasks
//@access Private
const createTask = asyncHandler(async (req, res) => {
  const { task, description} = req.body
  if (!task || !description) {
    res.status(400)
    throw new Error('Please add a task and a description')
  }
  const member = await Member.findById(req.member.id)
  if (!member) {
    res.status(401)
    throw new Error('Member not found')
  }
  const newTask = await Task.create({ ...req.body, member: req.member.id })
  res.status(201).json(newTask)
})

module.exports = { getTasks, createTask }
