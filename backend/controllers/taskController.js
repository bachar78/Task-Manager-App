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

//@des Get a single task
//@route GET /api/tasks/:id
//@access Private

const getTask = asyncHandler(async (req, res) => {
  const { id } = req.params
  //get member
  const member = await Member.findById(req.member.id)
  if (!member) {
    res.status(401)
    throw new Error('Member not found')
  }
  const task = await Task.findById(id)
  if (!task) {
    res.status(404)
    throw new Error('Ticket not found')
  }
  if (task.member.toString() !== req.member.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }
  res.status(200).json(task)
})

//@des Create a new task
//@route POST /api/tasks
//@access Private
const createTask = asyncHandler(async (req, res) => {
  const { task, description, status, deadline } = req.body
  if (!task || !description || !deadline) {
    res.status(400)
    throw new Error('Please fill all the fields')
  }
  const member = await Member.findById(req.member.id)
  if (!member) {
    res.status(401)
    throw new Error('Member not found')
  }
  const newTask = await Task.create({
    task,
    description,
    deadline,
    status,
    member: req.member.id,
  })
  res.status(201).json(newTask)
})

//@des Delete a task
//@route DELETE /api/tasks/:id
//@access Private
const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params
  //get member
  const member = await Member.findById(req.member.id)
  if (!member) {
    res.status(401)
    throw new Error('Member not found')
  }
  const task = await Task.findById(id)

  if (!task) {
    res.status(404)
    throw new Error('Task not found')
  }
  if (task.member.toString() !== req.member.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }
  await task.remove()

  res.status(200).json(task)
})

// @desc    Update ticket
// @route   PUT /api/tickets/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params
  // Get user using the id in the JWT
  const member = await Member.findById(req.member.id)

  if (!member) {
    res.status(401)
    throw new Error('Member not found')
  }

  const task = await Task.findById(id)

  if (!task) {
    res.status(404)
    throw new Error('Task not found')
  }

  if (task.member.toString() !== req.member.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
  })

  res.status(200).json(updatedTask)
})

module.exports = { getTasks, createTask, getTask, deleteTask, updateTask }
