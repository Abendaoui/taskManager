const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'U Must Provide A Name !'],
    trim: true,
    maxlength: [20, 'Name Cannot Be More Than 20 characters'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
})

module.exports = mongoose.model('Task', TaskSchema)
