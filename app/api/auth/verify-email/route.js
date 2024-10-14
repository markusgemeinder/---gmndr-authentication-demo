// /app/api/auth/verify-email/route.js

import dbConnect from '@/db/connect';
import User from '@/db/models/User';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json({ message: 'Token is required.' }, { status: 400 });
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({ confirmationToken: hashedToken });

    if (!user) {
      return NextResponse.json({ message: 'The verification link is invalid.' }, { status: 401 });
    }

    if (user.isEmailConfirmed) {
      return NextResponse.json({ message: 'Your email is already confirmed. Please try logging in.' }, { status: 400 });
    }

    if (user.confirmationTokenExpiry <= Date.now()) {
      return NextResponse.json({ message: 'The verification link has expired.' }, { status: 410 });
    }

    await User.findOneAndUpdate(
      { confirmationToken: hashedToken },
      { isEmailConfirmed: true, confirmationToken: null, confirmationTokenExpiry: null }
    );

    const responseData = {
      message: 'Email successfully verified.',
      email: user.email,
    };

    return NextResponse.json(responseData, { status: 201 });
  } catch (error) {
    console.error('Verify email error:', error);
    return NextResponse.json({ message: 'Failed to verify email. Please try again later.' }, { status: 500 });
  }
}
