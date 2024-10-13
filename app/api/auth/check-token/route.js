// /app/api/check-token/route.js

import dbConnect from '@/db/connect';
import User from '@/db/models/User';
import crypto from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { token } = body;

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({ resetToken: hashedToken });

    if (!user) {
      return NextResponse.json({ message: 'The provided token is invalid.' }, { status: 401 });
    }

    if (user.resetTokenExpiry <= Date.now()) {
      return NextResponse.json({ message: 'The token has expired. Please request a new link.' }, { status: 410 });
    }

    return NextResponse.json({ message: 'The token is valid. You can reset your password.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong. Please try again later.' }, { status: 500 });
  }
}
