// /app/(auth)/reset-password/[token]/page.js

'use client';

import { useState } from 'react';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import { Main, Title } from '@/app/components/AuthForm/AuthFormStyles';
import ResetPasswordForm from '@/app/components/AuthForm/ResetPasswordForm';

export default function ResetPasswordPage({ params }) {
  const [password, setPassword] = useState('');

  async function handleSubmit(password) {
    const response = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });
    const data = await response.json();
    setPassword(data.password);
  }

  return (
    <>
      <ScrollToTop />
      <Main>
        <Title>Reset Password</Title>
        <ResetPasswordForm onSubmit={handleSubmit} password={password} />
      </Main>
    </>
  );
}
