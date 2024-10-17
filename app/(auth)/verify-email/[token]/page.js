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
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (params.token) {
      handleSubmit(params.token);
    }
  }, [params.token]);

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
        setModalMessage(data.message);
        setIsError(false);
        setShowResendButton(false);
      } else {
        setModalMessage(data.message);
        setIsError(true);
        setErrorCode(response.status);

        if (response.status === 410) {
          setShowResendButton(true);
          if (data.email) {
            setUserEmail(data.email);
          }
        } else {
          setShowResendButton(false);
        }

        if (response.status === 401) {
          setModalMessage(data.message);
          setShowModal(true);
          return;
        }
      }
    } catch (error) {
      setModalMessage(error.message || 'An unknown error occurred.');
      setIsError(true);
      setShowResendButton(false);
    }
    setShowModal(true);
  }

  async function handleResendVerification() {
    setResendLoading(true);

    setModalMessage('Preparing to send your verification email...');
    setShowModal(true);
    setIsSending(true);
    setIsSuccess(false);

    try {
      const response = await fetch('/api/auth/verify-email-resend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail }),
      });

      const result = await response.json();

      if (response.status === 200) {
        setModalMessage(
          'A new verification email has been sent. Please check your inbox (or spam folder) to confirm your account.'
        );
        setIsSuccess(true);
      } else {
        setModalMessage(result.message || 'An unexpected error occurred. Please try again later.');
        setIsSuccess(false);
      }
    } catch (error) {
      setModalMessage('An unexpected error occurred. Please try again later.');
      setIsSuccess(false);
    } finally {
      setResendLoading(false);
      setIsSending(false);
    }
  }

  function handleOkClick() {
    setShowModal(false);
    if (!isError || !showResendButton) {
      router.push('/login');
    } else if (isSuccess) {
      router.push('/login');
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
            <Paragraph>{'The verification link has expired. Please request a new one.'}</Paragraph>
          </>
        )}
      </Main>

      {showModal && <ModalPopup message={modalMessage} onOkClick={handleOkClick} isError={isError} />}
    </>
  );
}
