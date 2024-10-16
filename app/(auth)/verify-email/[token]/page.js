// /app/(auth)/verify-email/[token]/page.js

'use client';

import { useState, useEffect } from 'react';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import { Main, Title } from '@/app/components/AuthForm/AuthFormStyles';
import ModalPopup from '@/app/components/Common/ModalPopup';
import Button, { ButtonContainerMedium } from '@/app/components/Common/Button';
import { Paragraph } from '@/app/components/Common/CommonStyles';
import { useRouter } from 'next/navigation';

export default function VerifyEmailPage({ params }) {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [showResendButton, setShowResendButton] = useState(false);
  const [errorCode, setErrorCode] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const router = useRouter();

  async function handleSubmit(token) {
    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (response.ok) {
        setUserEmail(data.email);
        setModalMessage(data.message || 'Your email has been successfully verified.');
        setIsError(false);
      } else {
        setModalMessage(data.message || 'An error occurred. Please try again.');
        setIsError(true);
        setErrorCode(response.status);

        if (response.status === 400 || response.status === 401 || response.status === 410) {
          setShowResendButton(true);

          // Speichern der E-Mail-Adresse im Falle eines abgelaufenen Tokens
          if (response.status === 410 && data.email) {
            setUserEmail(data.email);
          }
        }
      }
    } catch (error) {
      setModalMessage('There was an issue verifying your email.');
      setIsError(true);
    }
    setShowModal(true);
  }

  async function handleResendVerification() {
    setResendLoading(true);
    try {
      // Sicherstellen, dass die E-Mail-Adresse gesetzt wurde
      if (!userEmail) {
        throw new Error('No email available to resend verification.');
      }

      const response = await fetch('/api/auth/verify-email-resend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setModalMessage(data.message || 'A new verification email has been sent.');
        setIsError(false);
      } else {
        setModalMessage(data.message || 'Unable to resend verification email.');
        setIsError(true);
      }
    } catch (error) {
      setModalMessage('There was an issue resending the verification email.');
      setIsError(true);
    }
    setResendLoading(false);
    setShowModal(true);
  }

  function handleOkClick() {
    if (!isError) {
      router.push('/login');
    } else {
      setShowModal(false);
    }
  }

  return (
    <>
      <ScrollToTop />
      <Main>
        <Title>Email Verification</Title>

        {!showResendButton ? (
          <>
            <ButtonContainerMedium>
              <Button
                onClick={() => handleSubmit(params.token)}
                bgColor='var(--color-button-login)'
                hoverColor='var(--color-button-login-hover)'>
                Confirm My Email
              </Button>
            </ButtonContainerMedium>
            <Paragraph>You need to confirm your email address to complete the registration process.</Paragraph>
          </>
        ) : (
          <>
            <ButtonContainerMedium>
              <Button
                onClick={handleResendVerification}
                disabled={resendLoading}
                bgColor='var(--color-button-login)'
                hoverColor='var(--color-button-login-hover)'>
                Resend Verification Email
              </Button>
            </ButtonContainerMedium>
            <Paragraph>
              {errorCode === 401
                ? 'The verification link is invalid. Please request a new one.'
                : 'The verification link has expired. Please request a new one.'}
            </Paragraph>
          </>
        )}
      </Main>

      {showModal && <ModalPopup message={modalMessage} onOkClick={handleOkClick} isError={isError} />}
    </>
  );
}
