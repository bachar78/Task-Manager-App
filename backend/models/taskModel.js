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
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'new',
    },
    deadline: {
      type: String,
      required: true,
    },
  },
  {
    timeStamps: true,
  }
)

module.exports = mongoose.model('Task', taskSchema)
