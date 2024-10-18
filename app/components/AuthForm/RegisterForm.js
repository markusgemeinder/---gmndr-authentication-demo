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
import validatePassword from '@/utils/validatePassword';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordQuality, setPasswordQuality] = useState('');

  const [modalState, setModalState] = useState({
    show: false,
    message: '',
    isSuccess: null,
    showOkButton: true,
  });

  const router = useRouter();

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

    const data = { email, password };

    setModalState({
      show: true,
      message: 'Preparing to create your account...',
      isSuccess: null,
      showOkButton: false,
    });

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      const success = response.status === 201;

      setModalState({
        show: true,
        message: responseData.message || 'Registration failed.',
        isSuccess: success,
        showOkButton: true,
      });
    } catch (error) {
      setModalState({
        show: true,
        message: 'An unexpected error occurred.',
        isSuccess: false,
        showOkButton: true,
      });
    }
  }

  function handleOkClick() {
    if (modalState.isSuccess) {
      router.push('/login');
    }
    setModalState((prevState) => ({ ...prevState, show: false }));
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
            />
          </InputContainer>
        </FormGroup>

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

      {modalState.show && (
        <ModalPopup message={modalState.message} onOkClick={handleOkClick} showOkButton={modalState.showOkButton} />
      )}
    </>
  );
}
