// /app/api/auth/register/route.js

import dbConnect from '@/db/connect';
import User from '@/db/models/User';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import sendEmail from '@/utils/sendEmail';

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
      // Prüfen, ob die E-Mail-Adresse bereits mit Google oder GitHub verbunden ist
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

      // Prüfen, ob die E-Mail-Adresse registriert, aber noch nicht bestätigt wurde
      if (!duplicate.isEmailConfirmed) {
        return NextResponse.json(
          { message: 'Your email address is already registered, but not confirmed yet. Please confirm and log in.' },
          { status: 400 }
        );
      }

      // Standardmeldung für doppelte E-Mail, die mit einem anderen Konto verknüpft ist
      return NextResponse.json(
        {
          message: 'Email is already in use. Please try logging in or reset your password.',
        },
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

    const baseUrl =
      process.env.NODE_ENV === 'production'
        ? 'https://gmndr-authentication-demo-prototype.vercel.app/'
        : 'http://localhost:3000';
    const confirmationUrl = `${baseUrl}/verify-email/${confirmationToken}`;

    const currentHour = new Date().getHours();
    let greeting;
    if (currentHour < 12) {
      greeting = 'Good morning';
    } else if (currentHour < 18) {
      greeting = 'Good afternoon';
    } else {
      greeting = 'Good evening';
    }

    const formattedExpiryTime = new Date(confirmationTokenExpiry).toLocaleString('en-US', {
      timeZone: 'Europe/Berlin',
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour12: true,
    });

    const userName = email.replace('@', '(at)').replace(/\.\w+$/, '');

    const subject = 'Email Confirmation | #GMNDR Authentication Demo';
    const text = `${greeting} ${userName},\n\nYou have successfully registered for the #GMNDR Authentication Demo.\n\nTo confirm your email address and activate your account, click the link below or paste it into your browser:\n\n${confirmationUrl}\n\nThe link is valid until ${formattedExpiryTime}.\n\nIf you did not register, you can ignore this email.\n\nBest regards,\nMarkus from #GMNDR Authentication Demo`;

    await sendEmail({
      to: email,
      subject: subject,
      text: text,
    });

    return NextResponse.json(
      { message: 'Registration successful! Please check your inbox (or spam folder) to confirm your account.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ message: 'Registration failed. Please try again later.' }, { status: 500 });
  }
}
