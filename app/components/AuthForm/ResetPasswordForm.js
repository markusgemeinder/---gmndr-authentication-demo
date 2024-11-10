// /app/components/AuthForm/ResetPasswordForm.js

'use client';

import { useState, useEffect, useRef, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Button, { ButtonContainerVertical } from '@/app/components/Button/Button';
import { FormContainer } from '@/app/components/AuthForm/AuthFormStyles';
import ModalPopup from '@/app/components/Common/ModalPopup';
import ValidatePassword from '@/app/components/Common/ValidatePassword';
import LanguageContext from '@/app/components/LanguageProvider';
import { getText } from '@/lib/languageLibrary';

export default function ResetPasswordForm() {
  const { language } = useContext(LanguageContext);
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  const [modalState, setModalState] = useState({
    show: false,
    message: '',
    isSuccess: null,
    showOkButton: true,
  });

  const router = useRouter();
  const passwordInputRef = useRef(null);

  useEffect(() => {
    const checkToken = async function () {
      const token = window.location.pathname.split('/').pop();

      if (!token) {
        setModalState({
          show: true,
          message: getText('reset_password_form', 'token_required', language),
          isSuccess: false,
          showOkButton: true,
        });
        setIsTokenExpired(true);
        return;
      }

      try {
        const response = await fetch('/api/auth/check-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        const result = await response.json();

        if (response.status === 401 || response.status === 410) {
          setModalState({
            show: true,
            message: result.message,
            isSuccess: false,
            showOkButton: true,
          });
          setIsTokenExpired(true);
        }
      } catch {
        setModalState({
          show: true,
          message: getText('reset_password_form', 'check_token_error', language),
          isSuccess: false,
          showOkButton: true,
        });
        setIsTokenExpired(true);
      }
    };

    checkToken();
  }, [language]);

  useEffect(() => {
    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const token = window.location.pathname.split('/').pop();
    const data = { password, token };

    setModalState({
      show: true,
      message: getText('reset_password_form', 'resetting_password', language),
      isSuccess: null,
      showOkButton: false,
    });

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const success = response.status === 201;
      const message = success
        ? getText('reset_password_form', 'password_saved', language)
        : (await response.json()).message || getText('reset_password_form', 'save_password_failed', language);

      setModalState({
        show: true,
        message,
        isSuccess: success,
        showOkButton: true,
      });
    } catch {
      setModalState({
        show: true,
        message: getText('reset_password_form', 'error_occurred', language),
        isSuccess: false,
        showOkButton: true,
      });
    }
  }

  function handleOkClick() {
    setModalState((prevState) => ({ ...prevState, show: false }));
    if (modalState.isSuccess) {
      router.push('/login');
    }
  }

  return (
    <>
      <FormContainer onSubmit={handleSubmit}>
        <ValidatePassword
          hasRepeatPassword={true}
          onPasswordValid={(isValid, pwd) => {
            setIsPasswordValid(isValid);
            if (isValid) {
              setPassword(pwd);
            } else {
              setPassword('');
            }
          }}
          ref={passwordInputRef}
        />
        <ButtonContainerVertical>
          <Button
            type='submit'
            bgColor='var(--color-button-primary)'
            hoverColor='var(--color-button-primary-hover)'
            disabled={!isPasswordValid || isTokenExpired}>
            {getText('reset_password_form', 'confirm', language)}
          </Button>
          <Button
            type='button'
            onClick={() => router.push('/')}
            bgColor='var(--color-button-secondary)'
            hoverColor='var(--color-button-secondary-hover)'>
            {getText('reset_password_form', 'cancel', language)}
          </Button>
        </ButtonContainerVertical>
      </FormContainer>

      {modalState.show && (
        <ModalPopup message={modalState.message} onOkClick={handleOkClick} showOkButton={modalState.showOkButton} />
      )}
    </>
  );
}
