import dbConnect from '@/db/connect';
import User from '@/db/models/User';
import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { getText } from '@/lib/languageLibrary';
import { getLanguageFromCookies } from '@/utils/getLanguageFromCookies';

export async function POST(req) {
  await dbConnect();
  const language = getLanguageFromCookies(req);

  const getLanguageText = (key) => {
    return getText('api_auth_check_token', key, language);
  };

  try {
    const body = await req.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json({ message: getLanguageText('token_required') }, { status: 400 });
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({ resetToken: hashedToken });

    if (!user) {
      return NextResponse.json({ message: getLanguageText('invalid_token') }, { status: 401 });
    }

    if (user.resetTokenExpiry <= Date.now()) {
      return NextResponse.json({ message: getLanguageText('token_expired') }, { status: 410 });
    }

    return NextResponse.json({ message: getLanguageText('token_valid') }, { status: 200 });
  } catch (error) {
    console.error('Check token error:', error);
    return NextResponse.json({ message: getLanguageText('server_error') }, { status: 500 });
  }
}
