// /app/api/forgot-password/route.js

import dbConnect from '@/db/connect';
import User from '@/db/models/User';
import crypto from 'crypto';
import { NextResponse } from 'next/server';
import sendEmail from '@/utils/sendEmail';

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { email } = body;

    const existingUser = await User.findOne({ email }).exec();
    if (!existingUser) {
      return NextResponse.json({ message: 'No account found with this email address.' }, { status: 400 });
    }

    // 1. Prüfen, ob der Benutzer über Google oder GitHub registriert ist
    if (existingUser.role === 'Google User' || existingUser.role === 'Google User (Admin)') {
      return NextResponse.json(
        { message: 'This email is linked to Google login. Password reset cannot be done here.' },
        { status: 400 }
      );
    }

    if (existingUser.role === 'GitHub User' || existingUser.role === 'GitHub User (Admin)') {
      return NextResponse.json(
        { message: 'This email is linked to GitHub login. Password reset cannot be done here.' },
        { status: 400 }
      );
    }

    // 2. Prüfen, ob die E-Mail-Adresse bestätigt wurde (isEmailConfirmed === true)
    if (!existingUser.isEmailConfirmed) {
      return NextResponse.json(
        { message: 'Your email address is not confirmed yet. Please confirm before resetting your password.' },
        { status: 400 }
      );
    }

    // 3. Token und Ablaufzeit generieren
    const resetToken = crypto.randomBytes(20).toString('hex');
    const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const passwordResetExpires = Date.now() + 3600000; // 1 Stunde

    existingUser.resetToken = passwordResetToken;
    existingUser.resetTokenExpiry = passwordResetExpires;

    await existingUser.save();

    const baseUrl =
      process.env.NODE_ENV === 'production' ? 'https://gmndr-authentication-demo.vercel.app/' : 'http://localhost:3000';
    const resetUrl = `${baseUrl}/reset-password/${resetToken}`;

    const formattedExpiryTime = new Date(passwordResetExpires).toLocaleString('en-US', {
      timeZone: 'Europe/Berlin',
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour12: true,
    });

    const currentHour = new Date().getHours();
    let greeting;
    if (currentHour < 12) {
      greeting = 'Good morning';
    } else if (currentHour < 18) {
      greeting = 'Good afternoon';
    } else {
      greeting = 'Good evening';
    }

    const user = existingUser.email.replace('@', '(at)').replace(/\.\w+$/, '');
    const subject = 'Password Reset | #GMNDR Authentication Demo';
    const text = `${greeting} ${user},\n\nYou requested a password reset. Click the link below or paste it into your browser:\n\n${resetUrl}\n\nThe link is valid until ${formattedExpiryTime}.\n\nIf you didn't request this, you can ignore this email.\n\nBest regards,\nMarkus from #GMNDR Authentication Demo`;

    await sendEmail({
      to: email,
      subject: subject,
      text: text,
    });

    return NextResponse.json({ message: 'A password reset link has been sent to your email.' }, { status: 200 });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ message: 'Something went wrong. Please try again later.' }, { status: 500 });
  }
}
