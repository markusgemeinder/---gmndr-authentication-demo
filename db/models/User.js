// /db/models/User.js

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, default: 'user' },
    confirmationToken: { type: String, required: false },
    confirmationTokenExpiry: { type: Date, required: false },
    isEmailConfirmed: { type: Boolean, default: false },
    resetToken: { type: String, required: false },
    resetTokenExpiry: { type: Date, required: false },
    isDemoUser: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.statics.findOrCreateDemoUser = async function () {
  const demoUserEmail = 'no-reply-demo-user@example.com';
  const demoUserPassword = 'DemoUser0815!';

  const demoUser = await this.findOne({ email: demoUserEmail });

  if (!demoUser) {
    const hashedPassword = await bcrypt.hash(demoUserPassword, 10);

    const newUser = await this.create({
      email: demoUserEmail,
      password: hashedPassword,
      role: 'demo',
      isDemoUser: true,
      isEmailConfirmed: true,
    });

    return newUser;
  }

  return demoUser;
};

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
