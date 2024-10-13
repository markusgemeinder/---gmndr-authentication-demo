// /app/api/forgot-password/route.js

import nodemailer from 'nodemailer';
import dbConnect from '@/db/connect';
import User from '@/db/models/User';
import crypto from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { email } = body;

    const existingUser = await User.findOne({ email }).exec();

    if (!existingUser) {
      return NextResponse.json({ message: 'No account found with this email address.' }, { status: 400 });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const passwordResetExpires = Date.now() + 3600000; // 1 hour

    existingUser.resetToken = passwordResetToken;
    existingUser.resetTokenExpiry = passwordResetExpires;

    await existingUser.save();

    const baseUrl =
      process.env.NODE_ENV === 'production' ? 'https://gmndr-authentication-demo.vercel.app' : 'http://localhost:3000';
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

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
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

    const mailOptions = {
      to: email,
      from: process.env.EMAIL_USER,
      subject: 'Password Reset',
      text: `${greeting} ${user},\n\nYou requested a password reset. Click the link below or paste it into your browser:\n\n${resetUrl}\n\nThe link is valid until ${formattedExpiryTime}.\n\nIf you didn't request this, you can ignore this email.\n\nBest regards,\nMarkus from #GMNDR Authentication Demo`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'A password reset link has been sent to your email.' }, { status: 200 });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ message: 'Something went wrong. Please try again later.' }, { status: 500 });
  }
}
