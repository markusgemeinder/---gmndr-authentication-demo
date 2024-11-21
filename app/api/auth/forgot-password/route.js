// app/api/forgot-password/route.js

import dbConnect from '@/db/connect';
import User from '@/db/models/User';
import crypto from 'crypto';
import { NextResponse } from 'next/server';
import sendEmail from '@/utils/sendEmail';
import { getPasswordResetEmailText } from '@/utils/emailTemplate';
import { getText } from '@/lib/languageLibrary';
import { getLanguageFromCookies } from '@/utils/getLanguageFromCookies';

export async function POST(req) {
  await dbConnect();
  const language = getLanguageFromCookies(req);

  const getLanguageText = (key) => {
    return getText('api_auth_forgot_password', key, language);
  };

  try {
    const body = await req.json();
    const { email } = body;

    // Check if user exists
    const existingUser = await User.findOne({ email }).exec();
    if (!existingUser) {
      return NextResponse.json({ message: getLanguageText('no_account_found') }, { status: 404 });
    }

    // Check if the user is a Google or GitHub user
    const isGoogleUser = existingUser.role.includes('Google');
    const isGithubUser = existingUser.role.includes('GitHub');

    if (isGoogleUser || isGithubUser) {
      return NextResponse.json({ message: getLanguageText('google_github_link_error') }, { status: 403 });
    }

    // Check if the email is confirmed
    if (!existingUser.isEmailConfirmed) {
      return NextResponse.json({ message: getLanguageText('email_not_confirmed') }, { status: 400 });
    }

    // Generate the reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    const hashedResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const expiry = Date.now() + 3600000; // 1 hour

    // Update user with token and expiry
    await User.updateOne(
      { email },
      {
        $set: {
          passwordResetToken: hashedResetToken,
          passwordResetExpiry: expiry,
        },
      }
    );

    // Send the reset email
    const { subject, text } = getPasswordResetEmailText(resetToken, language);
    await sendEmail({
      to: email,
      subject,
      text,
    });

    // Successful response
    return NextResponse.json({ message: getLanguageText('password_reset_email_sent') }, { status: 200 });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ message: getLanguageText('forgot_password_failed') }, { status: 500 });
  }
}
