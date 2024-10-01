// /db/models/User.js

import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    // password: { type: String, required: true },
    // role: { type: String, default: 'Credentials User' },
    password: { type: String },
    role: { type: String },
    resetToken: { type: String, required: false },
    resetTokenExpiry: { type: Date, required: false },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
