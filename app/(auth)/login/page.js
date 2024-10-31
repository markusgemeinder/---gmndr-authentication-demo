// /app/(auth)/login/page.js

'use client';

import { signIn } from 'next-auth/react';
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import { Container, Title } from '@/app/components/Common/CommonStyles';
import LoginForm from '@/app/components/AuthForm/LoginForm';
import LanguageContext from '@/app/components/LanguageProvider';
import { getText } from '@/lib/languageLibrary';

export default function LoginPage() {
  const [error, setError] = useState('');
  const router = useRouter();
  const { language } = useContext(LanguageContext);

  async function handleLogin(email, password) {
    if (!email || !password) {
      setError(getText('auth_login', 'error_empty_fields', language));
      return false;
    }

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
      return false;
    } else if (result?.ok) {
      router.push('/reviews');
      return true;
    }
  }

  function handleOAuthLogin(provider) {
    setError('');
    signIn(provider, { callbackUrl: '/reviews' });
  }

  async function handleDemoLogin() {
    setError('');
    const demoEmail = 'no-reply-demo-user@example.com';
    const demoPassword = 'DemoUser0815!';

    const result = await signIn('credentials', {
      redirect: false,
      email: demoEmail,
      password: demoPassword,
    });

    if (result?.error) {
      setError(getText('auth_login', 'error_demo_login', language));
      return false;
    } else if (result?.ok) {
      router.push('/reviews');
      return true;
    }
  }

  return (
    <>
      <Container>
        <ScrollToTop />
        <Title>{getText('auth_login', 'title', language)}</Title>
        <LoginForm onLogin={handleLogin} onOAuthLogin={handleOAuthLogin} onDemoLogin={handleDemoLogin} error={error} />
      </Container>
    </>
  );
}
