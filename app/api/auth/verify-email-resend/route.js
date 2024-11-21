// app/api/auth/verify-email-resend/route.js

import dbConnect from '@/db/connect';
import User from '@/db/models/User';
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import sendEmail from '@/utils/sendEmail';
import { getResendVerificationEmailText } from '@/utils/emailTemplate';
import { getText } from '@/lib/languageLibrary';
import { getLanguageFromCookies } from '@/utils/getLanguageFromCookies';

export async function POST(req) {
  await dbConnect();
  const language = getLanguageFromCookies(req);

  const getLanguageText = (key) => {
    return getText('api_auth_verify_email_resend', key, language);
  };

  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ message: getLanguageText('email_required') }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: getLanguageText('no_account_found') }, { status: 404 });
    }

    if (user.isEmailConfirmed) {
      return NextResponse.json({ message: getLanguageText('email_already_confirmed') }, { status: 400 });
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

    return NextResponse.json({ message: getLanguageText('verification_email_sent') }, { status: 200 });
  } catch (error) {
    console.error('Resend verification error:', error);
    return NextResponse.json({ message: getLanguageText('resend_verification_failed') }, { status: 500 });
  }
}
