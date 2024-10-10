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
      return NextResponse.json(
        { message: 'Invalid token.' },
        { status: 401 } // Ungültiger Token
      );
    }

    if (user.resetTokenExpiry <= Date.now()) {
      return NextResponse.json(
        { message: 'Token has expired.' },
        { status: 410 } // Token abgelaufen (410 Gone)
      );
    }

    // Erfolgreiche Antwort zurückgeben
    return NextResponse.json({ message: 'Token is valid.' }, { status: 200 });
  } catch (error) {
    console.error('Token error:', error);
    return NextResponse.json({ message: 'An error occurred, please try again later.' }, { status: 500 });
  }
}
