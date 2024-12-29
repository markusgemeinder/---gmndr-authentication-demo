// /app/(auth)/login/page.js

'use client';

import { signIn } from 'next-auth/react';
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import { Container, Title } from '@/app/components/Common/CommonStyles';
import LoginForm from '@/app/components/AuthForm/LoginForm';
import LanguageContext from '@/app/components/Provider/LanguageProvider';
import { getText } from '@/lib/languageLibrary';

export default function LoginPage() {
  const [error, setError] = useState('');
  const router = useRouter();
  const { language } = useContext(LanguageContext);

  const getLanguageText = (key) => {
    return getText('auth_login', key, language);
  };

  async function handleLogin(email, password) {
    if (!email || !password) {
      setError(getLanguageText('error_empty_fields'));
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
      setError(getLanguageText('error_demo_login'));
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
        <Title>{getLanguageText('title')}</Title>
        <LoginForm onLogin={handleLogin} onOAuthLogin={handleOAuthLogin} onDemoLogin={handleDemoLogin} error={error} />
      </Container>
    </>
  );
}
