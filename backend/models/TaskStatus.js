const mongoose = require('mongoose');

const TaskStatusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  enabled: {
    type: Boolean,
    default: true
  }
});

const TaskStatus = mongoose.model('TaskStatus', TaskStatusSchema);

module.exports = TaskStatus;
