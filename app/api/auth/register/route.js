// /app/api/auth/register/route.js

import dbConnect from '@/db/connect';
import User from '@/db/models/User';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: 'Both email and password are required.' }, { status: 400 });
    }

    const duplicate = await User.findOne({ email }).lean().exec();
    if (duplicate) {
      return NextResponse.json({ message: 'Email already in use.' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      role: 'Credentials User',
    });

    return NextResponse.json({ message: 'User successfully registered! Please log in.' }, { status: 201 });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ message: 'Registration failed. Please try again later.' }, { status: 500 });
  }
}
