// /app/components/AuthForm/ForgotPasswordForm.js

'use client';

import { useState } from 'react';
import Button from '@/app/components/Common/Button';
import { FormContainer, Label, Input, ButtonContainer, WarningMessage } from './AuthFormStyles';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Label htmlFor='email'>Email:</Label>
      <Input id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
      <ButtonContainer>
        <Button type='submit' bgColor='var(--color-button-save)' hoverColor='var(--color-button-save-hover)'>
          Send Reset Link
        </Button>
      </ButtonContainer>
      {message && <WarningMessage>{message}</WarningMessage>}
    </FormContainer>
  );
}
