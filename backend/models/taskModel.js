const mongoose = require('mongoose')

const taskSchema = mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Member',
    },
    task: {
      type: String,
      required: [true, 'Please enter a task'],
    },
    description: {
      type: String,
      required: [true, 'Please enter a description of the task'],
    },
    status: {
      type: String,
      enum: ['new', 'started', 'Progress', 'finished'],
      required: [true, 'Please define a status'],
      default: 'new',
    },
    deadline: {
      type: String,
      required: [true, 'Please define a Deadline'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Task', taskSchema)
