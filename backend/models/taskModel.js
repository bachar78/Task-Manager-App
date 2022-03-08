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
      unique: true,
    },
    status: {
      type: String,
      enum: ['new', 'started', 'in_progress', 'finished'],
      required: [true, 'Please add a position'],
      default: 'new',
    },
    deadline: {
      type: Date,
      required: [true, 'Please define a Deadline'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Task', taskSchema)
