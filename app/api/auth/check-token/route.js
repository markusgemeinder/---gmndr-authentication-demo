import dbConnect from '@/db/connect';
import User from '@/db/models/User';
import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { getText } from '@/lib/languageLibrary';
import { getLanguageFromCookies } from '@/utils/getLanguageFromCookies';

export async function POST(req) {
  await dbConnect();

  const language = getLanguageFromCookies(req);

  try {
    const body = await req.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { message: getText('api_auth_check_token', 'token_required', language) },
        { status: 400 }
      );
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({ resetToken: hashedToken });

    if (!user) {
      return NextResponse.json(
        { message: getText('api_auth_check_token', 'invalid_token', language) },
        { status: 401 }
      );
    }

    if (user.resetTokenExpiry <= Date.now()) {
      return NextResponse.json(
        { message: getText('api_auth_check_token', 'token_expired', language) },
        { status: 410 }
      );
    }

    return NextResponse.json({ message: getText('api_auth_check_token', 'token_valid', language) }, { status: 200 });
  } catch (error) {
    console.error('Check token error:', error);
    return NextResponse.json({ message: getText('api_auth_check_token', 'server_error', language) }, { status: 500 });
  }
}
