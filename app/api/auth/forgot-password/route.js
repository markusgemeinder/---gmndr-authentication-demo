// app/api/forgot-password/route.js

import dbConnect from '@/db/connect';
import User from '@/db/models/User';
import crypto from 'crypto';
import { NextResponse } from 'next/server';
import sendEmail from '@/utils/sendEmail';
import { getPasswordResetEmailText } from '@/utils/emailTemplate';
import { getText } from '@/lib/languageLibrary';

export async function POST(req) {
  await dbConnect();
  const language = req.headers.get('accept-language')?.split(',')[0] || 'EN';

  try {
    const body = await req.json();
    const { email } = body;

    // Überprüfen, ob der Benutzer existiert
    const existingUser = await User.findOne({ email }).exec();
    if (!existingUser) {
      return NextResponse.json(
        { message: getText('api_auth_forgot_password', 'no_account_found', language) },
        { status: 404 }
      );
    }

    // Überprüfen, ob der Benutzer ein Google- oder GitHub-Nutzer ist
    const isGoogleUser = existingUser.role.includes('Google');
    const isGithubUser = existingUser.role.includes('GitHub');

    if (isGoogleUser || isGithubUser) {
      return NextResponse.json(
        { message: getText('api_auth_forgot_password', 'google_github_link_error', language) },
        { status: 403 }
      );
    }

    // Überprüfen, ob die E-Mail bestätigt wurde
    if (!existingUser.isEmailConfirmed) {
      return NextResponse.json(
        { message: getText('api_auth_forgot_password', 'email_not_confirmed', language) },
        { status: 400 }
      );
    }

    // Generierung des Rücksetz-Tokens
    const resetToken = crypto.randomBytes(20).toString('hex');
    const hashedResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const expiry = Date.now() + 3600000; // 1 Stunde

    // Aktualisieren des Benutzers mit dem Token und Ablaufdatum
    await User.updateOne(
      { email },
      {
        $set: {
          passwordResetToken: hashedResetToken,
          passwordResetExpiry: expiry,
        },
      }
    );

    // Senden der Rücksetz-E-Mail
    const { subject, text } = getPasswordResetEmailText(resetToken, language);
    await sendEmail({
      to: email,
      subject,
      text,
    });

    // Erfolgreiche Antwort
    return NextResponse.json(
      { message: getText('api_auth_forgot_password', 'password_reset_email_sent', language) },
      { status: 200 }
    );
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { message: getText('api_auth_forgot_password', 'forgot_password_failed', language) },
      { status: 500 }
    );
  }
}
