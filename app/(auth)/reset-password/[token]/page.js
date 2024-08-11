// /app/(auth)/reset-password/[token]/page.js

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import Button from '@/app/components/Common/Button';

const Main = styled.main`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const FormContainer = styled.form`
  background-color: #f5f5f5;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 0.375rem;
  padding: 1rem;
  max-width: 32rem;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a5568;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const Message = styled.p`
  color: #e00;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

export default function ResetPasswordPage({ params }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { token } = params;

  useEffect(() => {
    console.log('Token from params:', token); // Debugging: Überprüfen des Tokens
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
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
  };

  return (
    <>
      <ScrollToTop />
      <Main>
        <Title>Reset Password</Title>
        <FormContainer onSubmit={handleSubmit}>
          <Label htmlFor='password'>New Password:</Label>
          <Input
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Label htmlFor='confirm-password'>Confirm Password:</Label>
          <Input
            id='confirm-password'
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <ButtonContainer>
            <Button type='submit' bgColor='var(--color-button-save)' hoverColor='var(--color-button-save-hover)'>
              Reset Password
            </Button>
          </ButtonContainer>
        </FormContainer>
        {message && <Message>{message}</Message>}
      </Main>
    </>
  );
}
