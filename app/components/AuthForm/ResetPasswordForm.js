// /app/components/AuthForm/ResetPasswordForm.js

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import Button, { ButtonContainer } from '@/app/components/Common/Button';
import { Main, Title, FormContainer, Label, Input, WarningMessage } from './AuthFormStyles';

export default function ResetPasswordForm({ token }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

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
          <Label htmlFor='confirmPassword'>Confirm Password:</Label>
          <Input
            id='confirmPassword'
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
        {message && <WarningMessage>{message}</WarningMessage>}
      </Main>
    </>
  );
}
