// /app/(auth)/verify-email/[token]/page.js

'use client';

import { useState } from 'react';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import { Main, Title } from '@/app/components/AuthForm/AuthFormStyles';
import ModalPopup from '@/app/components/Common/ModalPopup';
import Button, { ButtonContainer } from '@/app/components/Common/Button';
import { Paragraph } from '@/app/components/Common/CommonStyles';

export default function VerifyEmailPage({ params }) {
  const [verificationStatus, setVerificationStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isError, setIsError] = useState(false);

  async function handleSubmit(token) {
    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        setVerificationStatus('Email successfully verified!');
        setModalMessage('Your email address has been successfully verified.');
        setIsError(false);
      } else {
        const errorData = await response.json();
        setVerificationStatus('Verification failed.');
        setModalMessage(errorData.message || 'Unknown error.');
        setIsError(true);
      }
    } catch (error) {
      setVerificationStatus('An error occurred.');
      setModalMessage('There was an issue verifying your email.');
      setIsError(true);
    }
    setShowModal(true);
  }

  return (
    <>
      <ScrollToTop />
      <Main>
        <Title>Email Verification</Title>
        <ButtonContainer>
          <Button
            onClick={() => handleSubmit(params.token)}
            bgColor='var(--color-button-login)'
            hoverColor='var(--color-button-login-hover)'>
            Verify My Email
          </Button>
        </ButtonContainer>
        <Paragraph>You need to confirm your email address to complete the registration process.</Paragraph>
      </Main>

      {showModal && (
        <ModalPopup message={modalMessage} onOkClick={() => (window.location.href = '/login')} isError={isError} />
      )}
    </>
  );
}
