// /app/(auth)/forgot-password/page.js

'use client';

import { useContext, useState } from 'react';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import { Container, Title } from '@/app/components/Common/CommonStyles';
import ForgotPasswordForm from '@/app/components/AuthForm/ForgotPasswordForm';
import LanguageContext from '@/app/components/Provider/LanguageProvider';
import { getText } from '@/lib/languageLibrary';

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState('');
  const { language } = useContext(LanguageContext);

  const getLanguageText = (key) => {
    return getText('auth_forgot_password', key, language);
  };

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
        <Title>{getLanguageText('title')}</Title>
        <ForgotPasswordForm onSubmit={handleSubmit} message={message} />
      </Container>
    </>
  );
}
