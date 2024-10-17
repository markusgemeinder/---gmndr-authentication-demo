import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String },
    confirmationToken: { type: String, required: false },
    confirmationTokenExpiry: { type: Date, required: false },
    isEmailConfirmed: { type: Boolean, default: false },
    resetToken: { type: String, required: false },
    resetTokenExpiry: { type: Date, required: false },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
