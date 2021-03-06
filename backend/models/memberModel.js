const mongoose = require('mongoose')

const memberSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    position: {
      type: String,
      required: [true, 'Please add a position'],
      enum: ['Backend', 'Front-end', 'Full-stack', 'Admin', 'Design'],
      default: 'Front-end',
    },
    password: {
      type: String,
      required: [true, 'Please add a Password'],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Member', memberSchema)
