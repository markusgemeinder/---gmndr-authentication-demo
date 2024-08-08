// /app/(auth)/login/page.js

'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import Button from '@/app/components/Common/Button';

const Main = styled.main`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  width: 100%;
`;

const FormContainer = styled.form`
  background-color: #f5f5f5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 0.375rem;
  padding: 1rem;
  max-width: 20rem;
  width: 100%;
`;

const InputContainer = styled.div`
  margin-bottom: 0.8rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a5568;
  margin-bottom: 0.1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  margin-bottom: 0.5rem;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 1rem 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid var(--color-text-light);
    margin: 0 0.8rem;
  }

  span {
    color: var(--color-text-light);
    font-size: 0.875rem;
  }
`;

const Warning = styled.div`
  color: red;
  font-size: 0.875rem;
  margin: 0.5rem 0;
  text-align: center;
`;

export default function LoginPage() {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

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
        <FormContainer onSubmit={handleLogin}>
          <ButtonContainer>
            <Button
              type='button'
              bgColor='var(--color-button-login)'
              hoverColor='var(--color-button-login-hover)'
              onClick={() => handleOAuthLogin('github')}
              style={{ width: '100%' }}>
              Login with GitHub
            </Button>
            <Button
              type='button'
              bgColor='var(--color-button-login)'
              hoverColor='var(--color-button-login-hover)'
              onClick={() => handleOAuthLogin('google')}
              style={{ width: '100%' }}>
              Login with Google
            </Button>
            <Divider>
              <span>or</span>
            </Divider>
            <InputContainer>
              <Label htmlFor='email'>Your email:</Label>
              <Input id='email' type='email' name='email' />
              <Label htmlFor='password'>Password:</Label>
              <Input id='password' type='password' name='password' />
            </InputContainer>
            {error && <Warning>{error}</Warning>}
            <Button
              type='submit'
              bgColor='var(--color-button-login)'
              hoverColor='var(--color-button-login-hover)'
              style={{ width: '100%' }}>
              Login
            </Button>
            <Button
              type='button'
              onClick={() => router.push('/forgot-password')}
              bgColor='var(--color-button-hover)'
              hoverColor='var(--color-button)'
              style={{ width: '100%' }}>
              Forgot Password
            </Button>
          </ButtonContainer>
        </FormContainer>
      </Main>
    </>
  );
}
