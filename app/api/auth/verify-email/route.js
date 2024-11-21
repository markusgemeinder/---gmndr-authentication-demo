// /app/api/auth/verify-email/route.js

import dbConnect from '@/db/connect';
import User from '@/db/models/User';
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getText } from '@/lib/languageLibrary';
import { getLanguageFromCookies } from '@/utils/getLanguageFromCookies';

export async function POST(req) {
  await dbConnect();
  const language = getLanguageFromCookies(req);

  const getLanguageText = (key) => {
    return getText('api_auth_verify_email', key, language);
  };

  try {
    const body = await req.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json({ message: getLanguageText('token_required') }, { status: 400 });
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({ confirmationToken: hashedToken });

    if (!user) {
      return NextResponse.json(
        {
          message: getLanguageText('invalid_link'),
        },
        { status: 401 }
      );
    }

    if (user.isEmailConfirmed) {
      return NextResponse.json({ message: getLanguageText('email_already_confirmed') }, { status: 400 });
    }

    if (user.confirmationTokenExpiry <= Date.now()) {
      return NextResponse.json(
        {
          message: getLanguageText('link_expired'),
          email: user.email,
        },
        { status: 410 }
      );
    }

    await User.findOneAndUpdate(
      { confirmationToken: hashedToken },
      { isEmailConfirmed: true, confirmationToken: null, confirmationTokenExpiry: null }
    );

    const responseData = {
      message: getLanguageText('email_verified'),
      email: user.email,
    };

    return NextResponse.json(responseData, { status: 201 });
  } catch (error) {
    console.error('Verify email error:', error);
    return NextResponse.json({ message: getLanguageText('verification_failed') }, { status: 500 });
  }
}
