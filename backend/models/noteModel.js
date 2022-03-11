const mongoose = require('mongoose')

const noteSchema = mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Member',
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Task',
    },
    text: {
      type: String,
      required: [true, 'Please add a note'],
    },
    byAdminRead: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Note', noteSchema)
