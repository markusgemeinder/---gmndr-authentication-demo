// /app/(auth)/verify-email/[token]/page.js

'use client';

import { useState, useEffect, useContext } from 'react';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import { Container, Title, Paragraph } from '@/app/components/Common/CommonStyles';
import ModalPopup from '@/app/components/Common/ModalPopup';
import Button, { ButtonContainerHorizontal } from '@/app/components/Button/Button';
import { useRouter } from 'next/navigation';
import LanguageContext from '@/app/components/LanguageProvider';
import { getText } from '@/lib/languageLibrary';

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
  const { language } = useContext(LanguageContext);

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
        message: error.message || getText('auth_verify_email_token', 'error_unknown', language),
        showResendButton: false,
        isSuccess: false,
        showOkButton: true,
      });
    }
  }

  async function handleResendVerification() {
    setModalState({
      show: true,
      message: getText('auth_verify_email_token', 'message_preparing_to_send', language),
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
          message: getText('auth_verify_email_token', 'message_verification_email_sent', language),
          showResendButton: false,
          isSuccess: true,
          showOkButton: true,
        });
      } else {
        setModalState({
          show: true,
          message: result.message || getText('auth_verify_email_token', 'error_unexpected', language),
          showResendButton: false,
          isSuccess: false,
          showOkButton: true,
        });
      }
    } catch (error) {
      setModalState({
        show: true,
        message: getText('auth_verify_email_token', 'error_unexpected', language),
        showResendButton: false,
        isSuccess: false,
        showOkButton: true,
      });
    }
  }

  async function handleVerifyClick() {
    setModalState({
      show: true,
      message: getText('auth_verify_email_token', 'message_verifying_email', language),
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
        <Title>{getText('auth_verify_email_token', 'title', language)}</Title>
        {!modalState.showResendButton ? (
          <>
            <ButtonContainerHorizontal>
              <Button
                onClick={handleVerifyClick}
                bgColor='var(--color-button-login)'
                hoverColor='var(--color-button-login-hover)'>
                {getText('auth_verify_email_token', 'button_confirm_email', language)}
              </Button>
            </ButtonContainerHorizontal>
            <Paragraph>{getText('auth_verify_email_token', 'paragraph_instruction', language)}</Paragraph>
          </>
        ) : (
          <>
            <ButtonContainerHorizontal>
              <Button
                onClick={handleResendVerification}
                bgColor='var(--color-button-warning)'
                hoverColor='var(--color-button-warning-hover)'>
                {getText('auth_verify_email_token', 'button_resend_verification', language)}
              </Button>
            </ButtonContainerHorizontal>
            <Paragraph>{getText('auth_verify_email_token', 'paragraph_verification_link_expired', language)}</Paragraph>
          </>
        )}
        {modalState.show && (
          <ModalPopup message={modalState.message} onOkClick={handleOkClick} showOkButton={modalState.showOkButton} />
        )}
      </Container>
    </>
  );
}
