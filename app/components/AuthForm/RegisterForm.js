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
import { ModalOverlay, ModalHeader, ModalContent, ModalButtonContainer } from '@/app/components/Common/ModalPopup';

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

  const checkPasswordQuality = (pwd) => {
    if (pwd.length < 8) {
      setPasswordQuality('Must be at least 8 characters.');
    } else if (!/[A-Z]/.test(pwd)) {
      setPasswordQuality('Must contain an uppercase letter.');
    } else if (!/[a-z]/.test(pwd)) {
      setPasswordQuality('Must contain a lowercase letter.');
    } else if (!/[0-9]/.test(pwd)) {
      setPasswordQuality('Must contain a number.');
    } else if (!/[!@#$%^&*]/.test(pwd)) {
      setPasswordQuality('Must contain a special character.');
    } else {
      setPasswordQuality('');
    }
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
    const data = { email, password };

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setModalMessage('Account successfully created! Please login.');
        setIsError(false);
        setShowModal(true);
      } else {
        const errorText = await response.json();
        if (errorText.message === 'Duplicate Email') {
          setModalMessage(`Account with email ${email} already exists. Please try logging in.`);
        } else {
          setModalMessage(`Register failed: ${errorText.message}`);
        }
        setIsError(true);
        setShowModal(true);
      }
    } catch (error) {
      setModalMessage('An unexpected error occurred.');
      setIsError(true);
      setShowModal(true);
    }
  };

  const handleOkClick = () => {
    setShowModal(false);
    router.push('/');
  };

  const handleCancel = () => {
    router.push('/');
  };

  const handleToggleVisibility = (event) => {
    event.preventDefault();
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <FormContainer onSubmit={handleSubmit}>
        <FormGroup>
          <LabelContainer>
            <Label htmlFor='email'>Email:</Label>
          </LabelContainer>
          <Input id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
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
              onChange={(e) => {
                setPassword(e.target.value);
                checkPasswordQuality(e.target.value);
              }}
              required
            />
            <ToggleVisibility onClick={handleToggleVisibility}>
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
            onClick={handleCancel}
            bgColor='var(--color-button-cancel)'
            hoverColor='var(--color-button-cancel-hover)'>
            Cancel
          </Button>
        </ButtonContainer>
      </FormContainer>

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>{modalMessage}</ModalHeader>
            <ModalButtonContainer>
              <Button
                onClick={handleOkClick}
                bgColor='var(--color-button-ok)'
                hoverColor='var(--color-button-ok-hover)'
                color='var(--color-button-text)'>
                OK
              </Button>
            </ModalButtonContainer>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}
