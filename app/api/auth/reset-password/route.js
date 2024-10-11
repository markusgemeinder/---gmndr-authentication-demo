// /app/api/auth/reset-password/route.js

import dbConnect from '@/db/connect';
import User from '@/db/models/User';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { password, token } = body;

    if (!password || !token) {
      return NextResponse.json({ message: 'Password and token are required.' }, { status: 400 });
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({ resetToken: hashedToken });

    if (!user) {
      return NextResponse.json({ message: 'Invalid token.' }, { status: 401 });
    }

    if (user.resetTokenExpiry <= Date.now()) {
      return NextResponse.json({ message: 'Token has expired.' }, { status: 410 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate(
      { resetToken: hashedToken },
      { password: hashedPassword, resetToken: null, resetTokenExpiry: null }
    );

    return NextResponse.json({ message: 'Password updated successfully.' }, { status: 201 });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json({ message: 'Error updating password.', error }, { status: 500 });
  }
}
