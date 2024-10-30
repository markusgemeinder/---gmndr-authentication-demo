// /app/api/auth/register/route.js

import dbConnect from '@/db/connect';
import User from '@/db/models/User';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import sendEmail from '@/utils/sendEmail';
import { getRegistrationEmailText } from '@/utils/emailTemplate';

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: 'Both email and password are required.' }, { status: 400 });
    }

    const duplicate = await User.findOne({ email }).lean().exec();
    if (duplicate) {
      if (duplicate.role === 'Google User' || duplicate.role === 'Google User (Admin)') {
        return NextResponse.json(
          { message: 'This email is already registered with Google. Please log in using Google.' },
          { status: 409 }
        );
      }

      if (duplicate.role === 'GitHub User' || duplicate.role === 'GitHub User (Admin)') {
        return NextResponse.json(
          { message: 'This email is already registered with GitHub. Please log in using GitHub.' },
          { status: 409 }
        );
      }

      if (!duplicate.isEmailConfirmed) {
        return NextResponse.json(
          { message: 'Your email address is already registered, but not confirmed yet. Please confirm and log in.' },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { message: 'Email is already in use. Please try logging in or reset your password.' },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const confirmationToken = crypto.randomBytes(20).toString('hex');
    const confirmationTokenHashed = crypto.createHash('sha256').update(confirmationToken).digest('hex');
    const confirmationTokenExpiry = Date.now() + 86400000;

    const user = await User.create({
      email,
      password: hashedPassword,
      role: 'Credentials User',
      confirmationToken: confirmationTokenHashed,
      confirmationTokenExpiry: confirmationTokenExpiry,
    });

    const text = getRegistrationEmailText(confirmationToken);

    await sendEmail({
      to: email,
      subject: 'Email Confirmation | #GMNDR Authentication Demo',
      text,
    });

    return NextResponse.json(
      { message: 'Registration successful! Please check your email inbox in a few minutes to confirm your account.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ message: 'Registration failed. Please try again later.' }, { status: 500 });
  }
}
