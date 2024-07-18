const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['to do', 'in progress', 'completed'], default: 'to do' },
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
},{timestamps:true});

module.exports = mongoose.model('Task', TaskSchema);
