import { getCsrfToken } from 'next-auth/react';
import { sendPasswordResetEmail } from '../../../lib/email'; // Implement this function

export default async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  // Implement logic to generate a password reset token and save it in your database
  const token = 'generated-reset-token'; // Replace with actual logic

  await sendPasswordResetEmail(email, token);

  res.status(200).json({ message: 'Password reset link has been sent to your email' });
};
