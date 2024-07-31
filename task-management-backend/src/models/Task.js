import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  desc: { type: String, required: true },
  status: {
    type: Number,
    enum: [1, 2, 3],
    default: 1,
  },
  
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
  });

  const Task = mongoose.model('Task', TaskSchema);

  export default Task;
