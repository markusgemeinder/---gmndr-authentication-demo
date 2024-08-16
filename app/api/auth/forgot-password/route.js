// // /app/api/auth/forgot-password/route.js

// import nodemailer from 'nodemailer';
// import dbConnect from '@/db/connect';
// import User from '@/db/models/User';
// import PasswordResetToken from '@/db/models/PasswordResetToken';
// const crypto = require('crypto');

// export async function POST(req) {
//   const { email } = await req.json();

//   try {
//     // Stellen Sie sicher, dass die Datenbankverbindung hergestellt ist
//     await dbConnect();

//     // Überprüfen, ob der Benutzer existiert
//     const user = await User.findOne({ email }).exec();
//     if (!user) {
//       return new Response(JSON.stringify({ message: 'No user found with this email' }), { status: 400 });
//     }

//     // Erstellen eines Passwort-Reset-Tokens
//     const token = crypto.randomBytes(20).toString('hex');
//     await PasswordResetToken.create({ userId: user._id, token });

//     // Bestimmen der Basis-URL
//     const baseUrl =
//       process.env.NODE_ENV === 'production' ? 'https://gmndr-authentication-demo.vercel.app' : 'http://localhost:3000';

//     const resetLink = `${baseUrl}/reset-password/${token}`;

//     console.log('Generated Token:', token);
//     console.log('Reset Link:', resetLink);

//     // SMTP-Transporter einrichten
//     const transporter = nodemailer.createTransport({
//       host: process.env.EMAIL_HOST,
//       port: process.env.EMAIL_PORT,
//       secure: process.env.EMAIL_SECURE === 'true', // Verwende die Umgebungsvariable
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     // Zeitgesteuerte Anrede
//     const currentHour = new Date().getHours();
//     let greeting;
//     if (currentHour < 12) {
//       greeting = 'Good morning';
//     } else if (currentHour < 18) {
//       greeting = 'Good afternoon';
//     } else {
//       greeting = 'Good evening';
//     }

//     // E-Mail-Optionen
//     const mailOptions = {
//       to: email,
//       from: process.env.EMAIL_USER,
//       subject: 'Password Reset',
//       text: `${greeting} ${user.username},\n\nYou are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
//         Please click on the following link, or paste this into your browser to complete the process:\n\n
//         ${resetLink}\n\n
//         If you did not request this, please ignore this email and your password will remain unchanged.\n\n
//         Best regards,\n
//         Markus from #GMNDR Authentication Demo`,
//     };

//     // E-Mail senden
//     await transporter.sendMail(mailOptions);
//     return new Response(JSON.stringify({ message: 'Reset link sent to email' }), { status: 200 });
//   } catch (error) {
//     console.error('Error handling password reset request:', error);

//     let errorMessage = 'Error handling password reset request.';

//     if (error.responseCode === 535 || error.code === 'EAUTH') {
//       errorMessage = 'Invalid email authentication credentials. Please check your email settings.';
//     }

//     return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
//   }
// }

// /app/api/auth/forgot-password/route.js

import nodemailer from 'nodemailer';
import dbConnect from '@/db/connect';
import User from '@/db/models/User';
import PasswordResetToken from '@/db/models/PasswordResetToken';
const crypto = require('crypto');

export async function POST(req) {
  const { email } = await req.json();

  try {
    // Stellen Sie sicher, dass die Datenbankverbindung hergestellt ist
    await dbConnect();

    // Überprüfen, ob der Benutzer existiert
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return new Response(JSON.stringify({ message: 'No user found with this email' }), { status: 400 });
    }

    // Erstellen eines Passwort-Reset-Tokens
    const token = crypto.randomBytes(20).toString('hex');
    await PasswordResetToken.create({ userId: user._id, token });

    // Bestimmen der Basis-URL
    const baseUrl =
      process.env.NODE_ENV === 'production' ? 'https://gmndr-authentication-demo.vercel.app' : 'http://localhost:3000';

    const resetLink = `${baseUrl}/reset-password/${token}`;

    console.log('Generated Token:', token);
    console.log('Reset Link:', resetLink);

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

    // E-Mail-Optionen
    const mailOptions = {
      to: email,
      from: process.env.EMAIL_USER,
      subject: 'Password Reset',
      text: `${greeting} ${user.username},\n\nYou are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        ${resetLink}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n\n
        Best regards,\n
        Markus from #GMNDR Authentication Demo`,
    };

    // E-Mail senden
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ message: 'Reset link sent to email' }), { status: 200 });
  } catch (error) {
    console.error('Error handling password reset request:', error);

    let errorMessage = 'Error handling password reset request.';

    if (error.responseCode === 535 || error.code === 'EAUTH') {
      errorMessage = 'Invalid email authentication credentials. Please check your email settings.';
    }

    return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
  }
}
