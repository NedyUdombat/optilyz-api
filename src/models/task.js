import { Schema, model } from 'mongoose';

const Task = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    deadline: { type: Date, required: true },
    notificationTime: { type: Date, required: true },
    isCompleted: { type: Boolean, default: false },
    userId: { type: Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
  },
);

export default model('Task', Task);
