// /app/api/auth/reset-password/route.js

import dbConnect from '@/db/connect';
import User from '@/db/models/User';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { getText } from '@/lib/languageLibrary';
import { getLanguageFromCookies } from '@/utils/getLanguageFromCookies';

export async function POST(req) {
  const language = getLanguageFromCookies(req);

  const getLanguageText = (key) => {
    return getText('api_auth_reset_password', key, language);
  };

  await dbConnect();

  try {
    const body = await req.json();
    const { password, token } = body;

    if (!password || !token) {
      return NextResponse.json({ message: getLanguageText('password_and_token_required') }, { status: 400 });
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({ resetToken: hashedToken });

    if (!user) {
      return NextResponse.json({ message: getLanguageText('invalid_reset_link') }, { status: 401 });
    }

    if (user.resetTokenExpiry <= Date.now()) {
      return NextResponse.json({ message: getLanguageText('link_expired') }, { status: 410 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate(
      { resetToken: hashedToken },
      { password: hashedPassword, resetToken: null, resetTokenExpiry: null }
    );

    return NextResponse.json({ message: getLanguageText('password_updated') }, { status: 201 });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json({ message: getLanguageText('update_failed') }, { status: 500 });
  }
}
