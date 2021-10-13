import { Schema, model } from 'mongoose';

const User = new Schema(
  {
    fullname: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export default model('User', User);
