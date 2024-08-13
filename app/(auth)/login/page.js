// /app/(auth)/login/page.js

'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import { Main, Title } from '@/app/components/AuthForm/AuthFormStyles';
import LoginForm from '@/app/components/AuthForm/LoginForm';

export default function LoginPage() {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (email, password) => {
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else if (result?.ok) {
      router.push('/reviews');
    }
  };

  const handleOAuthLogin = (provider) => {
    setError(''); // Reset error when using OAuth
    signIn(provider, { callbackUrl: '/reviews' });
  };

  return (
    <>
      <ScrollToTop />
      <Main>
        <Title>Login</Title>
        <LoginForm
          onLogin={handleLogin}
          onOAuthLogin={handleOAuthLogin}
          error={error}
          onForgotPassword={() => router.push('/forgot-password')}
        />
      </Main>
    </>
  );
}
