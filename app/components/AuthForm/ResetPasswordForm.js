// /app/components/AuthForm/ResetPasswordForm.js

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button, { ButtonContainerVertical } from '@/app/components/Common/Button';
import {
  FormContainer,
  FormGroup,
  LabelContainer,
  Label,
  InputContainer,
  Input,
  ToggleVisibility,
  PasswordHiddenIcon,
  PasswordVisibleIcon,
  WarningMessage,
  CheckIcon,
} from '@/app/components/AuthForm/AuthFormStyles';
import ModalPopup from '@/app/components/Common/ModalPopup';
import validatePassword from '@/utils/validatePassword';

export default function ResetPasswordForm() {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordQuality, setPasswordQuality] = useState('');
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

  function handlePasswordChange(pwd) {
    setPassword(pwd);
    setPasswordQuality(validatePassword(pwd));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (password !== repeatPassword) {
      setModalState({
        show: true,
        message: "Passwords don't match. Please check and try again.",
        isSuccess: false,
        showOkButton: true,
      });
      return;
    }

    if (passwordQuality) {
      setModalState({
        show: true,
        message: 'Password is too weak. Please follow the requirements and improve it.',
        isSuccess: false,
        showOkButton: true,
      });
      return;
    }

    const token = window.location.pathname.split('/').pop();
    const data = { password, token };

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

  function togglePasswordVisibility() {
    setPasswordVisible(!passwordVisible);
  }

  return (
    <>
      <FormContainer onSubmit={handleSubmit}>
        <FormGroup>
          <LabelContainer>
            <Label htmlFor='password'>New Password:</Label>
            {passwordQuality === '' && password.length > 0 ? (
              <CheckIcon />
            ) : (
              <WarningMessage>{passwordQuality}</WarningMessage>
            )}
          </LabelContainer>
          <InputContainer>
            <Input
              id='password'
              type={passwordVisible ? 'text' : 'password'}
              value={password}
              onChange={(event) => handlePasswordChange(event.target.value)}
              required
              disabled={isTokenExpired}
            />
            <ToggleVisibility onClick={togglePasswordVisibility} type='button'>
              {passwordVisible ? <PasswordVisibleIcon /> : <PasswordHiddenIcon />}
            </ToggleVisibility>
          </InputContainer>
        </FormGroup>

        <FormGroup>
          <LabelContainer>
            <Label htmlFor='repeat-password'>Repeat Password:</Label>
            {password === repeatPassword && repeatPassword ? (
              <CheckIcon />
            ) : (
              password.length > 0 &&
              repeatPassword === '' && <WarningMessage>Please repeat the password.</WarningMessage>
            )}
            {password !== repeatPassword && repeatPassword && password.length > 0 && (
              <WarningMessage>Passwords do not match.</WarningMessage>
            )}
          </LabelContainer>
          <InputContainer>
            <Input
              id='repeat-password'
              type={passwordVisible ? 'text' : 'password'}
              value={repeatPassword}
              onChange={(event) => setRepeatPassword(event.target.value)}
              required
              disabled={isTokenExpired}
            />
          </InputContainer>
        </FormGroup>

        <ButtonContainerVertical>
          <Button
            type='submit'
            bgColor='var(--color-button-login)'
            hoverColor='var(--color-button-login-hover)'
            disabled={password !== repeatPassword || passwordQuality !== '' || isTokenExpired}>
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
