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
      return NextResponse.json(
        {
          message: 'Invalid link. It may have already been used or was copied incorrectly.',
        },
        { status: 401 }
      );
    }

    if (user.isEmailConfirmed) {
      return NextResponse.json(
        { message: 'Your email is already confirmed, the verification link is invalid. Please try logging in.' },
        { status: 400 }
      );
    }

    if (user.confirmationTokenExpiry <= Date.now()) {
      return NextResponse.json(
        {
          message: 'The verification link has expired. Please request a new one.',
          email: user.email, // E-Mail-Adresse für spätere Verwendung im Frontend
        },
        { status: 410 }
      );
    }

    // Wenn alle Checks bestehen, E-Mail bestätigen
    await User.findOneAndUpdate(
      { confirmationToken: hashedToken },
      { isEmailConfirmed: true, confirmationToken: null, confirmationTokenExpiry: null }
    );

    const responseData = {
      message: 'Email successfully verified. Please log in.',
      email: user.email,
    };

    return NextResponse.json(responseData, { status: 201 });
  } catch (error) {
    console.error('Verify email error:', error);
    return NextResponse.json({ message: 'Failed to verify email. Please try again later.' }, { status: 500 });
  }
}
