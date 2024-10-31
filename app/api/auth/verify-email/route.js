// /app/api/auth/verify-email/route.js

import dbConnect from '@/db/connect';
import User from '@/db/models/User';
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getText } from '@/lib/languageLibrary';

export async function POST(req) {
  const language = req.headers.get('accept-language')?.split(',')[0] || 'EN';
  await dbConnect();

  try {
    const body = await req.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { message: getText('api_auth_verify_email', 'token_required', language) },
        { status: 400 }
      );
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({ confirmationToken: hashedToken });

    if (!user) {
      return NextResponse.json(
        {
          message: getText('api_auth_verify_email', 'invalid_link', language),
        },
        { status: 401 }
      );
    }

    if (user.isEmailConfirmed) {
      return NextResponse.json(
        { message: getText('api_auth_verify_email', 'email_already_confirmed', language) },
        { status: 400 }
      );
    }

    if (user.confirmationTokenExpiry <= Date.now()) {
      return NextResponse.json(
        {
          message: getText('api_auth_verify_email', 'link_expired', language),
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
      message: getText('api_auth_verify_email', 'email_verified', language),
      email: user.email,
    };

    return NextResponse.json(responseData, { status: 201 });
  } catch (error) {
    console.error('Verify email error:', error);
    return NextResponse.json(
      { message: getText('api_auth_verify_email', 'verification_failed', language) },
      { status: 500 }
    );
  }
}
