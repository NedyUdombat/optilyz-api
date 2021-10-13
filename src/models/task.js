import { Schema, model } from 'mongoose';

const Task = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    deadline: { type: String, required: true },
    notificationTime: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export default model('Task', Task);
