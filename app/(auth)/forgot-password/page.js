// /app/api/auth/forgot-password.js

// import nodemailer from 'nodemailer';
// import { getUserByEmail, savePasswordResetToken } from '@/utils/db';
// import crypto from 'crypto';

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   const { email } = req.body;

//   if (!email || typeof email !== 'string' || !email.includes('@')) {
//     return res.status(400).json({ message: 'Invalid email address' });
//   }

//   try {
//     // Überprüfen, ob der Benutzer existiert
//     const user = await getUserByEmail(email);
//     if (!user) {
//       return res.status(400).json({ message: 'No user found with this email' });
//     }

//     // Erstellen eines Passwort-Reset-Tokens
//     const token = crypto.randomBytes(20).toString('hex');
//     await savePasswordResetToken(user._id, token);

//     // SMTP-Transporter einrichten
//     const transporter = nodemailer.createTransport({
//       host: process.env.EMAIL_HOST,
//       port: process.env.EMAIL_PORT,
//       secure: process.env.EMAIL_PORT == 465,
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const resetLink = `${
//       process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://gmndr-authentication-demo.vercel.app'
//     }/reset-password/${token}`;

//     // E-Mail-Optionen
//     const mailOptions = {
//       to: email,
//       from: process.env.EMAIL_USER,
//       subject: 'Password Reset',
//       text: `Hello ${user.username},\n\n
//         You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
//         Please click on the following link, or paste this into your browser to complete the process:\n\n
//         ${resetLink}\n\n
//         If you did not request this, please ignore this email and your password will remain unchanged.\n\n
//         Best regards,\nMarkus from #GMNDR Authentication Demo`,
//     };

//     // E-Mail senden
//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ message: 'Reset link sent to email' });
//   } catch (error) {
//     console.error('Error in forgot-password handler:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }

'use client';

import { useState } from 'react';
import styled from 'styled-components';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import Button from '@/app/components/Common/Button';

const Main = styled.main`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const FormContainer = styled.form`
  background-color: #f5f5f5;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 0.375rem;
  padding: 1rem;
  max-width: 32rem;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a5568;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const Message = styled.p`
  color: #e00;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <>
      <ScrollToTop />
      <Main>
        <Title>Forgot Password</Title>
        <FormContainer onSubmit={handleSubmit}>
          <Label htmlFor='email'>Email:</Label>
          <Input id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          <ButtonContainer>
            <Button type='submit' bgColor='var(--color-button-save)' hoverColor='var(--color-button-save-hover)'>
              Send Reset Link
            </Button>
          </ButtonContainer>
        </FormContainer>
        {message && <Message>{message}</Message>}
      </Main>
    </>
  );
}
