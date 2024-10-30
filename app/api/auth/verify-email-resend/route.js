// /app/api/auth/verify-email-resend/route.js

import dbConnect from '@/db/connect';
import User from '@/db/models/User';
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import sendEmail from '@/utils/sendEmail';
import { getResendVerificationEmailText } from '@/utils/emailTemplate'; // Import der Vorlage

export async function POST(req) {
  await dbConnect();

  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ message: 'Email is required.' }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'No account found with that email.' }, { status: 404 });
    }

    if (user.isEmailConfirmed) {
      return NextResponse.json({ message: 'Your email is already confirmed.' }, { status: 400 });
    }

    const token = crypto.randomBytes(20).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const expiry = Date.now() + 86400000; // 24 Stunden

    await User.updateOne({ email }, { $set: { confirmationToken: hashedToken, confirmationTokenExpiry: expiry } });

    const text = getResendVerificationEmailText(token);

    await sendEmail({
      to: email,
      subject: 'Email Confirmation (New Request) | #GMNDR Authentication Demo',
      text,
    });

    return NextResponse.json({ message: 'A new verification email has been sent.' }, { status: 200 });
  } catch (error) {
    console.error('Resend verification error:', error);
    return NextResponse.json(
      { message: 'Failed to resend verification email. Please try again later.' },
      { status: 500 }
    );
  }
}
