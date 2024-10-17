// /app/components/AuthForm/ResetPasswordForm.js

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button, { ButtonContainer } from '@/app/components/Common/Button';
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
  const [error, setError] = useState('');
  const [passwordQuality, setPasswordQuality] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkToken = async function () {
      const token = window.location.pathname.split('/').pop();

      if (!token) {
        setModalMessage('Token is required.');
        setIsTokenExpired(true);
        setShowModal(true);
        return;
      }

      try {
        const response = await fetch('/api/auth/check-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        const result = await response.json();

        if (response.status === 401) {
          setModalMessage(result.message);
          setIsError(true);
          setShowModal(true);
        } else if (response.status === 410) {
          setModalMessage(result.message);
          setIsTokenExpired(true);
          setShowModal(true);
        }
      } catch {
        setModalMessage('An error occurred while checking the token.');
        setIsTokenExpired(true);
        setShowModal(true);
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
      setError('Passwords do not match.');
      return;
    }

    if (passwordQuality) {
      setError('Please improve your password.');
      return;
    }

    const token = window.location.pathname.split('/').pop();
    const data = { password, token };

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

      setModalMessage(message);
      setIsError(!success);
      setShowModal(true);
    } catch {
      setModalMessage('An error occurred. Please try again.');
      setIsError(true);
      setShowModal(true);
    }
  }

  function handleOkClick() {
    setShowModal(false);
    router.push(isError || isTokenExpired ? '/' : '/login');
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

        {error && <WarningMessage>{error}</WarningMessage>}

        <ButtonContainer>
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
        </ButtonContainer>
      </FormContainer>

      {showModal && <ModalPopup message={modalMessage} onOkClick={handleOkClick} isError={isError || isTokenExpired} />}
    </>
  );
}
