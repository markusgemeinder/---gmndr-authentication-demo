// /app/api/auth/verify-email-resend/route.js

import dbConnect from '@/db/connect';
import User from '@/db/models/User';
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import sendEmail from '@/utils/sendEmail';

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

    // const baseUrl =
    //   process.env.NODE_ENV === 'production' ? 'https://gmndr-authentication-demo.vercel.app/' : 'http://localhost:3000';
    // const confirmationUrl = `${baseUrl}/verify-email/${token}`;
    const confirmationUrl = `https://gmndr-authentication-demo.vercel.app/verify-email/${token}`;

    const currentHour = new Date().getHours();
    let greeting;
    if (currentHour < 12) {
      greeting = 'Good morning';
    } else if (currentHour < 18) {
      greeting = 'Good afternoon';
    } else {
      greeting = 'Good evening';
    }

    const formattedExpiryTime = new Date(expiry).toLocaleString('en-US', {
      timeZone: 'Europe/Berlin',
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour12: true,
    });

    const userEmailFormatted = email.replace('@', '(at)').replace(/\.\w+$/, '');
    const subject = 'Email Confirmation (New Request) | #GMNDR Authentication Demo';
    const text = `${greeting} ${userEmailFormatted},\n\nYou requested to resend the confirmation email. Please click the link below to verify your email address:\n\n${confirmationUrl}\n\nThe link is valid until ${formattedExpiryTime}.\n\nIf you did not request this, please ignore this email.\n\nBest regards,\nYour Service Team`;

    await sendEmail({
      to: email,
      subject,
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
