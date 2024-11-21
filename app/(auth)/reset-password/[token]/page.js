// /app/(auth)/reset-password/[token]/page.js

'use client';

import { useState, useContext } from 'react';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import { Container, Title, Paragraph } from '@/app/components/Common/CommonStyles';
import ResetPasswordForm from '@/app/components/AuthForm/ResetPasswordForm';
import ModalPopup from '@/app/components/Common/ModalPopup';
import LanguageContext from '@/app/components/LanguageProvider';
import { getText } from '@/lib/languageLibrary';

export default function ResetPasswordPage({ params }) {
  const [modalState, setModalState] = useState({
    show: false,
    message: '',
    isSuccess: null,
  });
  const { language } = useContext(LanguageContext);

  const getLanguageText = (key) => {
    return getText('auth_reset_password_token', key, language);
  };

  async function handleSubmit(password) {
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, token: params.token }),
      });
      const data = await response.json();

      if (response.ok) {
        setModalState({
          show: true,
          message: getLanguageText('message_reset_success'),
          isSuccess: true,
        });
      } else {
        setModalState({
          show: true,
          message: data.message || getLanguageText('error_unexpected'),
          isSuccess: false,
        });
      }
    } catch (error) {
      setModalState({
        show: true,
        message: error.message || getLanguageText('error_unknown'),
        isSuccess: false,
      });
    }
  }

  function handleOkClick() {
    setModalState({ show: false, message: '', isSuccess: null });
    if (modalState.isSuccess) {
      window.location.href = '/login';
    }
  }

  return (
    <>
      <Container>
        <ScrollToTop />
        <Title>{getLanguageText('title')}</Title>
        <ResetPasswordForm onSubmit={handleSubmit} />
        {modalState.show && <ModalPopup message={modalState.message} onOkClick={handleOkClick} showOkButton={true} />}
      </Container>
    </>
  );
}
