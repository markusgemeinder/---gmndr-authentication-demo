// /app/api/signup/route.js

import dbConnect from '@/db/connect';
import User from '@/db/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    await dbConnect();
    const { username, email, password } = await request.json();

    // Hash das Passwort
    const hashedPassword = await bcrypt.hash(password, 10);

    // Erstelle einen neuen User
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return new Response(JSON.stringify({ status: 'User created', user }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}
