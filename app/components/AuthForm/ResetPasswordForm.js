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

  // Validate the token before proceeding
  useEffect(() => {
    const checkToken = async () => {
      // Token aus der URL abrufen
      const token = window.location.pathname.split('/').pop(); // Holt den letzten Teil der URL

      if (!token) {
        setModalMessage('Token is required.');
        setIsTokenExpired(true);
        setShowModal(true);
        return;
      }

      try {
        const response = await fetch('/api/check-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }), // Token im Body der Anfrage senden
        });

        const result = await response.json();

        if (response.status === 401) {
          setModalMessage(result.message); // Invalid token
          setIsError(true);
          setShowModal(true);
        } else if (response.status === 410) {
          setModalMessage(result.message); // Token has expired
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

  const validatePassword = (pwd) => {
    if (pwd.length < 8) return 'Must be at least 8 characters.';
    if (!/[A-Z]/.test(pwd)) return 'Must contain an uppercase letter.';
    if (!/[a-z]/.test(pwd)) return 'Must contain a lowercase letter.';
    if (!/[0-9]/.test(pwd)) return 'Must contain a number.';
    if (!/[!@#$%^&*]/.test(pwd)) return 'Must contain a special character.';
    return '';
  };

  const handlePasswordChange = (pwd) => {
    setPassword(pwd);
    setPasswordQuality(validatePassword(pwd));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== repeatPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (passwordQuality) {
      setError('Please fix the password quality issues.');
      return;
    }

    const data = { password }; // Nur das Passwort, kein E-Mail erforderlich

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
  };

  const handleOkClick = () => {
    setShowModal(false);
    router.push(isError || isTokenExpired ? '/' : '/login');
  };

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

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
              onChange={(e) => handlePasswordChange(e.target.value)}
              required
              disabled={isTokenExpired} // Disable input if token expired
            />
            <ToggleVisibility onClick={togglePasswordVisibility}>
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
              password.length > 0 && repeatPassword === '' && <WarningMessage>Please enter.</WarningMessage>
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
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
              disabled={isTokenExpired} // Disable input if token expired
            />
          </InputContainer>
        </FormGroup>

        {error && <WarningMessage>{error}</WarningMessage>}

        <ButtonContainer>
          <Button
            type='submit'
            bgColor='var(--color-button-login)'
            hoverColor='var(--color-button-login-hover)'
            disabled={password !== repeatPassword || passwordQuality !== '' || isTokenExpired} // Disable button if token expired
          >
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
