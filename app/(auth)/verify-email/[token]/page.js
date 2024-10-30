// /app/(auth)/verify-email/[token]/page.js

'use client';

import { useState, useEffect } from 'react';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import { Container, Title } from '@/app/components/Common/CommonStyles';
import ModalPopup from '@/app/components/Common/ModalPopup';
import Button, { ButtonContainerHorizontal } from '@/app/components/Button/Button';
import { Paragraph } from '@/app/components/Common/CommonStyles';
import { useRouter } from 'next/navigation';

export default function VerifyEmailPage({ params }) {
  const [modalState, setModalState] = useState({
    show: false,
    message: '',
    showResendButton: false,
    isSuccess: null,
    showOkButton: true,
  });
  const [userEmail, setUserEmail] = useState(null);
  const router = useRouter();

  // useEffect(() => {
  //   if (params.token) {
  //     handleSubmit(params.token);
  //   }
  // }, [params.token]);

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
        setModalState({
          show: true,
          message: data.message,
          showResendButton: false,
          isSuccess: true,
          showOkButton: true,
        });
      } else {
        setModalState({
          show: true,
          message: data.message,
          showResendButton: response.status === 410,
          isSuccess: false,
          showOkButton: true,
        });
        if (response.status === 410 && data.email) {
          setUserEmail(data.email);
        }
      }
    } catch (error) {
      setModalState({
        show: true,
        message: error.message || 'An unknown error occurred.',
        showResendButton: false,
        isSuccess: false,
        showOkButton: true,
      });
    }
  }

  async function handleResendVerification() {
    setModalState({
      show: true,
      message: 'Preparing to send your verification email...',
      showResendButton: false,
      isSuccess: null,
      showOkButton: false,
    });

    try {
      const response = await fetch('/api/auth/verify-email-resend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail }),
      });

      const result = await response.json();

      if (response.status === 200) {
        setModalState({
          show: true,
          message:
            'A new verification email has been sent. Please check your email inbox in a few minutes to confirm your account.',
          showResendButton: false,
          isSuccess: true,
          showOkButton: true,
        });
      } else {
        setModalState({
          show: true,
          message: result.message || 'An unexpected error occurred. Please try again later.',
          showResendButton: false,
          isSuccess: false,
          showOkButton: true,
        });
      }
    } catch (error) {
      setModalState({
        show: true,
        message: 'An unexpected error occurred. Please try again later.',
        showResendButton: false,
        isSuccess: false,
        showOkButton: true,
      });
    }
  }

  async function handleVerifyClick() {
    setModalState({
      show: true,
      message: 'Your email is currently being verified. Please wait...',
      showResendButton: false,
      isSuccess: null,
      showOkButton: false,
    });

    await handleSubmit(params.token);
  }

  function handleOkClick() {
    setModalState((prevState) => ({ ...prevState, show: false }));

    if (modalState.isSuccess) {
      router.push('/login');
    }
  }

  return (
    <>
      <Container>
        <ScrollToTop />
        <Title>Email Verification</Title>
        {!modalState.showResendButton ? (
          <>
            <ButtonContainerHorizontal>
              <Button
                onClick={handleVerifyClick}
                bgColor='var(--color-button-login)'
                hoverColor='var(--color-button-login-hover)'>
                Confirm My Email
              </Button>
            </ButtonContainerHorizontal>
            <Paragraph>You need to confirm your email address to complete the registration process.</Paragraph>
          </>
        ) : (
          <>
            <ButtonContainerHorizontal>
              <Button
                onClick={handleResendVerification}
                bgColor='var(--color-button-login)'
                hoverColor='var(--color-button-login-hover)'>
                Resend Verification Email
              </Button>
            </ButtonContainerHorizontal>
            <Paragraph>{'The verification link has expired. Please request a new one.'}</Paragraph>
          </>
        )}
        {modalState.show && (
          <ModalPopup message={modalState.message} onOkClick={handleOkClick} showOkButton={modalState.showOkButton} />
        )}
      </Container>
    </>
  );
}
