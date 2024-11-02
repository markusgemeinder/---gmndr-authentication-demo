// app/api/auth/register/route.js

import dbConnect from '@/db/connect';
import User from '@/db/models/User';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import sendEmail from '@/utils/sendEmail';
import { getRegistrationEmailText } from '@/utils/emailTemplate';
import { getText } from '@/lib/languageLibrary';
import { getLanguageFromCookies } from '@/utils/getLanguageFromCookies';

export async function POST(req) {
  await dbConnect();
  const language = getLanguageFromCookies(req);

  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: getText('api_auth_register', 'missing_fields', language) }, { status: 400 });
    }

    const duplicate = await User.findOne({ email }).lean().exec();
    if (duplicate) {
      if (duplicate.role === 'Google User' || duplicate.role === 'Google User (Admin)') {
        return NextResponse.json(
          { message: getText('api_auth_register', 'google_user_error', language) },
          { status: 409 }
        );
      }

      if (duplicate.role === 'GitHub User' || duplicate.role === 'GitHub User (Admin)') {
        return NextResponse.json(
          { message: getText('api_auth_register', 'github_user_error', language) },
          { status: 409 }
        );
      }

      if (!duplicate.isEmailConfirmed) {
        return NextResponse.json(
          { message: getText('api_auth_register', 'email_not_confirmed', language) },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { message: getText('api_auth_register', 'email_in_use_error', language) },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const confirmationToken = crypto.randomBytes(20).toString('hex');
    const confirmationTokenHashed = crypto.createHash('sha256').update(confirmationToken).digest('hex');
    const confirmationTokenExpiry = Date.now() + 86400000; // 24 hours

    const user = await User.create({
      email,
      password: hashedPassword,
      role: 'Credentials User',
      confirmationToken: confirmationTokenHashed,
      confirmationTokenExpiry: confirmationTokenExpiry,
    });

    const { subject, text } = getRegistrationEmailText(confirmationToken, language);
    await sendEmail({
      to: email,
      subject,
      text,
    });

    return NextResponse.json(
      { message: getText('api_auth_register', 'registration_success', language) },
      { status: 201 }
    );
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { message: getText('api_auth_register', 'registration_failed', language) },
      { status: 500 }
    );
  }
}
