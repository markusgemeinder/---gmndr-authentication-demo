// /app/(auth)/reset-password/[token]/page.js

'use client';

import { useState } from 'react';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import { Container, Title } from '@/app/components/Common/CommonStyles';
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
      <Container>
        <ScrollToTop />
        <Title>Reset Password</Title>
        <ResetPasswordForm onSubmit={handleSubmit} password={password} />
      </Container>
    </>
  );
}
