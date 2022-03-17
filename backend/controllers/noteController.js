const Note = require('../models/noteModel')
const asyncHandler = require('express-async-handler')
const Member = require('../models/memberModel.js')
const Task = require('../models/taskModel')

//@des Get notes for a task
//@route GET /api/tasks/:taskId/notes
//@access Private

const getNotes = asyncHandler(async (req, res) => {
  const { taskId } = req.params
  const member = await Member.findById(req.member.id)
  if (!member) {
    res.status(401)
    throw new Error('Member not Found')
  }

  const task = await Task.findById(taskId)
  if (task.member.toString() !== req.member.id) {
    res.status(401)
    throw new Error('Member not Authorized')
  }
  const notes = await Note.find({ task: taskId })
  res.status(200).json(notes)
})

//@des check a note
//@route PUT /api/tasks/:taskId/notes/:noteId
//@access Private

const checkNote = asyncHandler(async (req, res) => {
  const { taskId, noteId } = req.params
  const member = await Member.findById(req.member.id)
  if (!member) {
    res.status(401)
    throw new Error('Member not Found')
  }

  const task = await Task.findById(taskId)
  if (task.member.toString() !== req.member.id) {
    res.status(401)
    throw new Error('Member not Authorized')
  }
  const note = await Note.findById(noteId)
  if (
    note.task.toString() !== task._id.toString() &&
    note.member.toString() !== req.member.id
  ) {
    res.status(401)
    throw new Error("This note doesn't belong to this task")
  }
  

  const checkedNote = await Note.findByIdAndUpdate(
    noteId,
    { isChecked: true },
    {
      new: true,
    }
  )
 
  res.status(200).json(checkedNote)
})

//@des Create  a new note for a task
//@route POST /api/tasks/:taskId/notes
//@access Private
const createNote = asyncHandler(async (req, res) => {
  const { taskId } = req.params
  const { text } = req.body
  const member = await Member.findById(req.member.id)
  if (!member) {
    res.status(401)
    throw new Error('Member not found')
  }
  const foundTask = await Task.findById(taskId)
  if (foundTask.member.toString() !== req.member.id) {
    res.status(401)
    throw new Error('Member not Authorized')
  }
  const newNote = await Note.create({
    member: req.member.id,
    task: taskId,
    text: text,
  })
  if (!newNote) {
    res.status(401)
    throw new Error('Something Went Wrong')
  }
  res.status(201).json(newNote)
})

module.exports = { getNotes, createNote, checkNote }
