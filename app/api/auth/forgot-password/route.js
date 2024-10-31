// /app/api/forgot-password/route.js

import dbConnect from '@/db/connect';
import User from '@/db/models/User';
import crypto from 'crypto';
import { NextResponse } from 'next/server';
import sendEmail from '@/utils/sendEmail';
import { getText } from '@/lib/languageLibrary'; // Importing language library

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { email } = body;

    const existingUser = await User.findOne({ email }).exec();
    if (!existingUser) {
      return NextResponse.json(
        { message: getText('api_auth_forgot_password', 'account_not_found', language) },
        { status: 400 }
      );
    }

    // 1. Check if the user is linked with Google or GitHub
    const isGoogleUser = existingUser.role.includes('Google User');
    const isGithubUser = existingUser.role.includes('GitHub User');

    if (isGoogleUser || isGithubUser) {
      return NextResponse.json(
        { message: getText('api_auth_forgot_password', 'linked_to_social_login', language) },
        { status: 400 }
      );
    }

    // 2. Check if the email address is confirmed
    if (!existingUser.isEmailConfirmed) {
      return NextResponse.json(
        { message: getText('api_auth_forgot_password', 'email_not_confirmed', language) },
        { status: 400 }
      );
    }

    // 3. Generate token and expiration time
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

    const greeting = getGreeting();
    const userDisplayName = formatUserEmail(existingUser.email);
    const subject = 'Password Reset | #GMNDR Authentication Demo';
    const text = `${greeting} ${userDisplayName},\n\nYou requested a password reset. Click the link below or paste it into your browser:\n\n${resetUrl}\n\nThe link is valid until ${formattedExpiryTime}.\n\nIf you didn't request this, you can ignore this email.\n\nBest regards,\nMarkus from #GMNDR Authentication Demo`;

    await sendEmail({
      to: email,
      subject,
      text,
    });

    return NextResponse.json(
      { message: getText('api_auth_forgot_password', 'reset_link_sent', language) },
      { status: 200 }
    );
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { message: getText('api_auth_forgot_password', 'server_error', language) },
      { status: 500 }
    );
  }
}

// Helper functions
function getGreeting() {
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    return 'Good morning';
  } else if (currentHour < 18) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
}

function formatUserEmail(email) {
  return email.replace('@', '(at)').replace(/\.\w+$/, '');
}
