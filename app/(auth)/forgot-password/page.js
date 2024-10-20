// /app/(auth)/forgot-password/page.js

'use client';

import { useState } from 'react';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import { Container, Title } from '@/app/components/Common/CommonStyles';
import ForgotPasswordForm from '@/app/components/AuthForm/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState('');

  async function handleSubmit(email) {
    const response = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    setMessage(data.message);
  }

  return (
    <>
      <Container>
        <ScrollToTop />
        <Title>Forgot Password</Title>
        <ForgotPasswordForm onSubmit={handleSubmit} message={message} />
      </Container>
    </>
  );
}
