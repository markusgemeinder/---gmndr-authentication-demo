import dbConnect from '@/db/connect';
import User from '@/db/models/User';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { username, email, password } = body;

    // Validierung der Eingabedaten
    if (!username || !email || !password) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    // Überprüfung auf doppelte E-Mails
    const duplicate = await User.findOne({ email }).lean().exec();
    if (duplicate) {
      return NextResponse.json({ message: 'Duplicate Email' }, { status: 409 });
    }

    // Hashen des Passworts
    const hashedPassword = await bcrypt.hash(password, 10);

    // Erstellen eines neuen Users mit Standardwert für "role"
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      // "role" wird auf den Standardwert "Unverified User" gesetzt
    });

    return NextResponse.json({ message: 'User Created.', user }, { status: 201 });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
}
