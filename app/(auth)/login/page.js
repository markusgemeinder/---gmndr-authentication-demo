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

  async function handleLogin(email, password) {
    if (!email || !password) {
      setError('Please enter both email and password.');
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

  return (
    <>
      <ScrollToTop />
      <Main>
        <Title>Login</Title>
        <LoginForm onLogin={handleLogin} onOAuthLogin={handleOAuthLogin} error={error} />
      </Main>
    </>
  );
}
