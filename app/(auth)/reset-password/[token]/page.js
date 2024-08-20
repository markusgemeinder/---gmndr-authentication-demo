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
    console.log('Token from params:', token); // Verifizieren, dass der Token korrekt ist
    if (!token) {
      router.push('/'); // Leite nur weiter, wenn der Token wirklich nicht existiert
    }
  }, [token]);

  const handleSubmit = async (password) => {
    try {
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
    } catch (error) {
      console.error('Error during password reset:', error);
      setMessage('An error occurred during password reset.');
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
