// /app/api/auth/reset-password/route.js

import dbConnect from '@/db/connect';
import User from '@/db/models/User';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { getText } from '@/lib/languageLibrary';

export async function POST(req) {
  const language = req.headers.get('accept-language')?.split(',')[0] || 'EN';
  await dbConnect();

  try {
    const body = await req.json();
    const { password, token } = body;

    if (!password || !token) {
      return NextResponse.json(
        { message: getText('api_auth_reset_password', 'password_and_token_required', language) },
        { status: 400 }
      );
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({ resetToken: hashedToken });

    if (!user) {
      return NextResponse.json(
        { message: getText('api_auth_reset_password', 'invalid_reset_link', language) },
        { status: 401 }
      );
    }

    if (user.resetTokenExpiry <= Date.now()) {
      return NextResponse.json(
        { message: getText('api_auth_reset_password', 'link_expired', language) },
        { status: 410 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate(
      { resetToken: hashedToken },
      { password: hashedPassword, resetToken: null, resetTokenExpiry: null }
    );

    return NextResponse.json(
      { message: getText('api_auth_reset_password', 'password_updated', language) },
      { status: 201 }
    );
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { message: getText('api_auth_reset_password', 'update_failed', language) },
      { status: 500 }
    );
  }
}
