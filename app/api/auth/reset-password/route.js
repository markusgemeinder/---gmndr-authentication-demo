// /app/api/auth/reset-password/route.js

import { resetUserPassword } from '@/lib/auth';

export default async (req, res) => {
  const { token, password } = req.body;

  // Debugging-Ausgaben
  console.log('Reset Password Endpoint Hit');
  console.log('Token:', token);
  console.log('Password:', password);

  if (!token || !password) {
    return res.status(400).json({ message: 'Token and password are required' });
  }

  const success = await resetUserPassword(token, password);

  if (success) {
    res.status(200).json({ success: true, message: 'Password has been reset' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid token or failed to reset password' });
  }
};
