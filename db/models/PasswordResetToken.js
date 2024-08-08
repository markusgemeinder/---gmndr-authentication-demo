// /db/models/PasswordResetToken.js

import mongoose from 'mongoose';

const { Schema } = mongoose;

const passwordResetTokenSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 3600 }, // Token läuft nach einer Stunde ab
});

const PasswordResetToken =
  mongoose.models.PasswordResetToken || mongoose.model('PasswordResetToken', passwordResetTokenSchema);

export default PasswordResetToken;
