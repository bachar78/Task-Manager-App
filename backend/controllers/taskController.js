const asyncHandler = require('express-async-handler')
const Member = require('../models/memberModel')
const Task = require('../models/taskModel')

//@des Get member tasks
//@route GET /api/tasks
//@access Private

const getTasks = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Get task'})
})

//@des Get member tasks
//@route POST /api/tasks
//@access Private
const createTask = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Create a new task'})
})

module.exports = {getTasks, createTask}