// /app/components/AuthForm/ForgotPasswordForm.js

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Button, { ButtonContainer } from '@/app/components/Common/Button';
import { FormContainer, FormGroup, LabelContainer, Label, Input } from '@/app/components/AuthForm/AuthFormStyles';
import ModalPopup from '@/app/components/Common/ModalPopup';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      router.replace('/reviews');
    }
  }, [sessionStatus, router]);

  function isValidEmail(email) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setModalMessage('Please enter a valid email address.');
      setShowModal(true);
      setIsSending(false);
      return;
    }

    setModalMessage('Preparing to send your password reset link...');
    setShowModal(true);
    setIsSending(true);
    setIsSuccess(false);

    const data = { email };

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.status === 200) {
        setModalMessage('A password reset link has been sent to your email.');
        setIsSuccess(true);
      } else {
        setModalMessage(result.message || 'An unexpected error occurred. Please try again later.');
        setIsSuccess(false);
      }
    } catch (error) {
      setModalMessage('An unexpected error occurred. Please try again later.');
      setIsSuccess(false);
    } finally {
      setIsSending(false);
    }
  }

  function handleOkClick() {
    setShowModal(false);

    if (isSuccess) {
      router.push('/login');
    }
  }

  return (
    <>
      <FormContainer onSubmit={handleSubmit}>
        <FormGroup>
          <LabelContainer>
            <Label htmlFor='email'>Email:</Label>
          </LabelContainer>
          <Input id='email' type='email' value={email} onChange={(event) => setEmail(event.target.value)} required />
        </FormGroup>
        <ButtonContainer>
          <Button type='submit' bgColor='var(--color-button-login)' hoverColor='var(--color-button-login-hover)'>
            Send Reset Link
          </Button>
        </ButtonContainer>
      </FormContainer>

      {showModal && <ModalPopup message={modalMessage} onOkClick={handleOkClick} isSending={isSending} />}
    </>
  );
}
