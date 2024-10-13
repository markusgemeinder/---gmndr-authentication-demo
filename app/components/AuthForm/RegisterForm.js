// /app/components/AuthForm/RegisterForm.js
'use client';

import { useState } from 'react';
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

function validatePassword(pwd) {
  if (pwd.length < 8) return 'Must be at least 8 characters long.';
  if (!/[A-Z]/.test(pwd)) return 'Must contain at least one uppercase letter.';
  if (!/[a-z]/.test(pwd)) return 'Must contain at least one lowercase letter.';
  if (!/[0-9]/.test(pwd)) return 'Must contain at least one number.';
  if (!/[!@#$%^&*]/.test(pwd)) return 'Must contain at least one special character.';
  return '';
}

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [passwordQuality, setPasswordQuality] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const router = useRouter();

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

    const data = { email, password };

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const success = response.status === 201;
      const message = success
        ? 'Account successfully created! Please login.'
        : response.status === 409
        ? `Account with email ${email} already exists. Please try logging in.`
        : (await response.json()).message || 'Register failed.';

      setModalMessage(message);
      setIsError(!success);
      setShowModal(true);
    } catch {
      setModalMessage('An unexpected error occurred.');
      setIsError(true);
      setShowModal(true);
    }
  }

  function handleOkClick() {
    setShowModal(false);
    router.push(isError ? '/' : '/login');
  }

  function togglePasswordVisibility() {
    setPasswordVisible(!passwordVisible);
  }

  return (
    <>
      <FormContainer onSubmit={handleSubmit}>
        <FormGroup>
          <LabelContainer>
            <Label htmlFor='email'>Email:</Label>
          </LabelContainer>
          <Input id='email' type='email' value={email} onChange={(event) => setEmail(event.target.value)} required />
        </FormGroup>

        <FormGroup>
          <LabelContainer>
            <Label htmlFor='password'>Password:</Label>
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
              password.length > 0 &&
              repeatPassword === '' && <WarningMessage>Please enter the password.</WarningMessage>
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
            />
          </InputContainer>
        </FormGroup>

        {error && <WarningMessage>{error}</WarningMessage>}

        <ButtonContainer>
          <Button
            type='submit'
            bgColor='var(--color-button-login)'
            hoverColor='var(--color-button-login-hover)'
            disabled={password !== repeatPassword || passwordQuality !== ''}>
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

      {showModal && <ModalPopup message={modalMessage} onOkClick={handleOkClick} isError={isError} />}
    </>
  );
}
