// /app/(auth)/reset-password/[token]/page.js

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import { Main, Title } from '@/app/components/AuthForm/AuthFormStyles';
import ResetPasswordForm from '@/app/components/AuthForm/ResetPasswordForm';

export default function ResetPasswordPage({ params }) {
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { token } = params;

  useEffect(() => {
    console.log('Token from params:', token); // Debugging: Überprüfen des Tokens
  }, [token]);

  const handleSubmit = async (password) => {
    const response = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, password }),
    });
    const data = await response.json();
    if (data.success) {
      router.push('/login');
    } else {
      setMessage(data.message);
    }
  };

  return (
    <>
      <ScrollToTop />
      <Main>
        <Title>Reset Password</Title>
        <ResetPasswordForm onSubmit={handleSubmit} message={message} />
      </Main>
    </>
  );
}
