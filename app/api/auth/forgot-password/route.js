// /app/api/forgot-password/route.js

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
      // Email existiert nicht
      return NextResponse.json({ message: 'No user registered with this email.' }, { status: 400 });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const passwordResetExpires = Date.now() + 3600000; // 1 Stunde

    // Setze den Reset-Token und Ablaufdatum
    existingUser.resetToken = passwordResetToken;
    existingUser.resetTokenExpiry = passwordResetExpires;

    // Speichere den Benutzer
    await existingUser.save();

    const baseUrl =
      process.env.NODE_ENV === 'production' ? 'https://gmndr-authentication-demo.vercel.app' : 'http://localhost:3000';
    const resetUrl = `${baseUrl}/reset-password/${resetToken}`;
    console.log(resetUrl);

    // Erfolgreiche Antwort zurückgeben
    return NextResponse.json({ message: 'Reset link sent to email' }, { status: 200 });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ message: 'An error occurred, please try again later.' }, { status: 500 });
  }
}
