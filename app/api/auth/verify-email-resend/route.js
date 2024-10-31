// app/api/auth/verify-email-resend/route.js

import dbConnect from '@/db/connect';
import User from '@/db/models/User';
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import sendEmail from '@/utils/sendEmail';
import { getResendVerificationEmailText } from '@/utils/emailTemplate';
import { getText } from '@/lib/languageLibrary';

export async function POST(req) {
  await dbConnect();
  const language = req.headers.get('accept-language')?.split(',')[0] || 'EN';

  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json(
        { message: getText('api_auth_verify_email_resend', 'email_required', language) },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: getText('api_auth_verify_email_resend', 'no_account_found', language) },
        { status: 404 }
      );
    }

    if (user.isEmailConfirmed) {
      return NextResponse.json(
        { message: getText('api_auth_verify_email_resend', 'email_already_confirmed', language) },
        { status: 400 }
      );
    }

    const token = crypto.randomBytes(20).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const expiry = Date.now() + 86400000; // 24 hours

    await User.updateOne({ email }, { $set: { confirmationToken: hashedToken, confirmationTokenExpiry: expiry } });

    const { subject, text } = getResendVerificationEmailText(token, language);
    await sendEmail({
      to: email,
      subject,
      text,
    });

    return NextResponse.json(
      { message: getText('api_auth_verify_email_resend', 'verification_email_sent', language) },
      { status: 200 }
    );
  } catch (error) {
    console.error('Resend verification error:', error);
    return NextResponse.json(
      { message: getText('api_auth_verify_email_resend', 'resend_verification_failed', language) },
      { status: 500 }
    );
  }
}
