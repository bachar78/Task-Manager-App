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
  const { taskId } = req.params
  //get member
  const member = await Member.findById(req.member.id)
  if (!member) {
    res.status(401)
    throw new Error('Member not found')
  }
  const task = await Task.findById(taskId)
  if (!task) {
    res.status(404)
    throw new Error('Task not found')
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
//@route DELETE /api/tasks/:taskId
//@access Private
const deleteTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params
  //get member
  const member = await Member.findById(req.member.id)
  if (!member) {
    res.status(401)
    throw new Error('Member not found')
  }
  const task = await Task.findById(taskId)

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

// @desc    Update task
// @route   PUT /api/tasks:taskId
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params
  // Get user using the id in the JWT
  const member = await Member.findById(req.member.id)

  if (!member) {
    res.status(401)
    throw new Error('Member not found')
  }

  const task = await Task.findById(taskId)

  if (!task) {
    res.status(404)
    throw new Error('Task not found')
  }

  if (task.member.toString() !== req.member.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
    new: true,
  })

  res.status(200).json(updatedTask)
})

//@des Fetch all tasks by admin
//@route Get /api/tasks/all
//@access Private Admin
const getAllTasks = asyncHandler(async (req, res) => {
  const allTasks = await Task.find({})
  if (allTasks) {
    res.json(allTasks)
  } else {
    res.status(404)
    throw Error('Products Not Found')
  }
})

//@des Delete a task by admin
//@route DELETE /api/tasks/:id/admin
//@access Private admin
const deleteTaskByAdmin = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)
  if (task) {
    await task.remove()
    res.json({ message: 'Task Removed' })
  } else {
    res.status(404)
    throw Error('Task Not Found')
  }
})

// @desc    Update a task
// @route   PUT /api/tasks/:id/admin
// @access  Private/Admin
const updateTaskByAdmin = asyncHandler(async (req, res) => {
  const { member, task, description, status, deadline } = req.body

  const taskToUpdate = await Task.findById(req.params.id)

  if (taskToUpdate) {
    taskToUpdate.member = member
    taskToUpdate.task = task
    taskToUpdate.description = description
    taskToUpdate.status = status
    taskToUpdate.deadline = deadline

    const updatedTask = await taskToUpdate.save()
    res.json(updatedTask)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

module.exports = {
  getTasks,
  createTask,
  getTask,
  deleteTask,
  updateTask,
  getAllTasks,
  deleteTask,
  deleteTaskByAdmin,
  updateTaskByAdmin,
}
