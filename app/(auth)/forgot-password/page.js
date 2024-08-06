// /app/(auth)/forgot-password/page.js

'use client';

import { useState } from 'react';
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

export default function ForgotPasswordPage() {
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
    <>
      <ScrollToTop />
      <Main>
        <Title>Forgot Password</Title>
        <FormContainer onSubmit={handleSubmit}>
          <Label htmlFor='email'>Email:</Label>
          <Input id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          <ButtonContainer>
            <Button type='submit' bgColor='var(--color-button-save)' hoverColor='var(--color-button-save-hover)'>
              Send Reset Link
            </Button>
          </ButtonContainer>
        </FormContainer>
        {message && <Message>{message}</Message>}
      </Main>
    </>
  );
}
