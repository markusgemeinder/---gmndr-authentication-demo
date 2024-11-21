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

  const getLanguageText = (key) => {
    return getText('reset_password_form', key, language);
  };

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
          message: getLanguageText('token_required'),
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
          message: getLanguageText('check_token_error'),
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
      message: getLanguageText('resetting_password'),
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
        ? getLanguageText('password_saved')
        : (await response.json()).message || getLanguageText('save_password_failed');

      setModalState({
        show: true,
        message,
        isSuccess: success,
        showOkButton: true,
      });
    } catch {
      setModalState({
        show: true,
        message: getLanguageText('error_occurred'),
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
            {getLanguageText('confirm')}
          </Button>
          <Button
            type='button'
            onClick={() => router.push('/')}
            bgColor='var(--color-button-secondary)'
            hoverColor='var(--color-button-secondary-hover)'>
            {getLanguageText('cancel')}
          </Button>
        </ButtonContainerVertical>
      </FormContainer>

      {modalState.show && (
        <ModalPopup message={modalState.message} onOkClick={handleOkClick} showOkButton={modalState.showOkButton} />
      )}
    </>
  );
}
