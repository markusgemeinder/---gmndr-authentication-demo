// /app/api/forgot-password/route.js

import nodemailer from 'nodemailer';
import dbConnect from '@/db/connect';
import User from '@/db/models/User';
import crypto from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { email } = body;
    const existingUser = await User.findOne({ email }).exec();

    if (!existingUser) {
      // Email existiert nicht
      return NextResponse.json({ message: 'No user registered with this email.' }, { status: 400 });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const passwordResetExpires = Date.now() + 3600000; // 1 Stunde

    // Setze den Reset-Token und Ablaufdatum
    existingUser.resetToken = passwordResetToken;
    existingUser.resetTokenExpiry = passwordResetExpires;

    // Speichere den Benutzer
    await existingUser.save();

    const baseUrl =
      process.env.NODE_ENV === 'production' ? 'https://gmndr-authentication-demo.vercel.app' : 'http://localhost:3000';
    const resetUrl = `${baseUrl}/reset-password/${resetToken}`;
    console.log(resetUrl);

    // SMTP-Transporter einrichten
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE === 'true', // Verwende die Umgebungsvariable
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Zeitgesteuerte Anrede
    const currentHour = new Date().getHours();
    let greeting;
    if (currentHour < 12) {
      greeting = 'Good morning';
    } else if (currentHour < 18) {
      greeting = 'Good afternoon';
    } else {
      greeting = 'Good evening';
    }

    // Benutzer-E-Mail mit "(at)" anstelle von "@" und Entfernen der Domain-Endung
    const user = existingUser.email.replace('@', '(at)').replace(/\.\w+$/, ''); // Entfernt .com, .de, etc.

    // E-Mail-Optionen
    const mailOptions = {
      to: email,
      from: process.env.EMAIL_USER,
      subject: 'Password Reset',
      text: `${greeting} ${user},\n\nYou are receiving this because you (or someone else) have requested the reset of the password for your account. Please click on the following link, or paste this into your browser to complete the process:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n\nBest regards,\nMarkus from #GMNDR Authentication Demo`,
    };

    // E-Mail senden
    await transporter.sendMail(mailOptions);

    // Erfolgreiche Antwort zurückgeben
    return NextResponse.json({ message: 'Reset link sent to email' }, { status: 200 });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ message: 'An error occurred, please try again later.' }, { status: 500 });
  }
}
