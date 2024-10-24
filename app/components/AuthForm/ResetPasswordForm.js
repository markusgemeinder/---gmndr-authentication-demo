// /app/components/AuthForm/ResetPasswordForm.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button, { ButtonContainerVertical } from '@/app/components/Common/Button';
import {
  FormContainer,
  InputGroup,
  LabelContainer,
  Label,
  InputContainer,
} from '@/app/components/AuthForm/AuthFormStyles';
import ModalPopup from '@/app/components/Common/ModalPopup';
import ValidatePassword from '@/app/components/Common/ValidatePassword';

export default function ResetPasswordForm() {
  const [password, setPassword] = useState(''); // Password stored here
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  const [modalState, setModalState] = useState({
    show: false,
    message: '',
    isSuccess: null,
    showOkButton: true,
  });

  const router = useRouter();

  useEffect(() => {
    const checkToken = async function () {
      const token = window.location.pathname.split('/').pop();

      if (!token) {
        setModalState({
          show: true,
          message: 'Token is required.',
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
          message: 'An error occurred while checking the token.',
          isSuccess: false,
          showOkButton: true,
        });
        setIsTokenExpired(true);
      }
    };

    checkToken();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const token = window.location.pathname.split('/').pop();
    const data = { password, token }; // Send only the validated password and token

    setModalState({
      show: true,
      message: 'Resetting your password...',
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
        ? 'New password saved. You can now log in.'
        : (await response.json()).message || 'Failed to save password. Please try again.';

      setModalState({
        show: true,
        message,
        isSuccess: success,
        showOkButton: true,
      });
    } catch {
      setModalState({
        show: true,
        message: 'An error occurred. Please try again.',
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
        />
        <ButtonContainerVertical>
          <Button
            type='submit'
            bgColor='var(--color-button-login)'
            hoverColor='var(--color-button-login-hover)'
            disabled={!isPasswordValid || isTokenExpired}>
            Confirm
          </Button>
          <Button
            type='button'
            onClick={() => router.push('/')}
            bgColor='var(--color-button-cancel)'
            hoverColor='var(--color-button-cancel-hover)'>
            Cancel
          </Button>
        </ButtonContainerVertical>
      </FormContainer>

      {modalState.show && (
        <ModalPopup message={modalState.message} onOkClick={handleOkClick} showOkButton={modalState.showOkButton} />
      )}
    </>
  );
}
