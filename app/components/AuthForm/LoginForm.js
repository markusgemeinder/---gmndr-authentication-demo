// /app/components/AuthForm/LoginForm.js

'use client';

import { useState, useEffect } from 'react';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import Button, { ButtonContainer } from '@/app/components/Common/Button';
import {
  FormContainer,
  FormGroup,
  LabelContainer,
  Label,
  Input,
  Divider,
  InputContainer,
  ToggleVisibility,
  PasswordVisibleIcon,
  PasswordHiddenIcon,
} from '@/app/components/AuthForm/AuthFormStyles';
import Link from 'next/link';
import ModalPopup from '@/app/components/Common/ModalPopup';

export default function LoginForm({ onLogin, onOAuthLogin, error }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (error) {
      showError(error);
    }
  }, [error]);

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleToggleVisibility(event) {
    event.preventDefault();
    setPasswordVisible(!passwordVisible);
  }

  function showError(message) {
    setModalMessage(message);
    setShowModal(true);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSending(true);

    try {
      const loginSuccess = await onLogin(email, password);

      if (!loginSuccess) {
        showError(error);
      }
    } catch (error) {
      showError(error.message);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <>
      <ScrollToTop />
      <FormContainer onSubmit={handleSubmit}>
        <ButtonContainer>
          <Button
            type='button'
            bgColor='var(--color-button-login)'
            hoverColor='var(--color-button-login-hover)'
            onClick={() => onOAuthLogin('github')}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src='/github-logo.svg' alt='GitHub Logo' style={{ width: '20px', marginRight: '8px' }} />
            GitHub
          </Button>

          <Button
            type='button'
            bgColor='var(--color-button-login)'
            hoverColor='var(--color-button-login-hover)'
            onClick={() => onOAuthLogin('google')}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src='/google-logo.svg' alt='Google Logo' style={{ width: '20px', marginRight: '8px' }} />
            Google
          </Button>

          <Divider>
            <span>or</span>
          </Divider>
          <FormGroup>
            <LabelContainer>
              <Label htmlFor='email'>Email:</Label>
            </LabelContainer>
            <Input id='email' type='email' name='email' value={email} onChange={handleEmailChange} required />
          </FormGroup>
          <FormGroup>
            <LabelContainer>
              <Label htmlFor='password'>Password:</Label>
            </LabelContainer>
            <InputContainer>
              <Input
                id='password'
                type={passwordVisible ? 'text' : 'password'}
                name='password'
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <ToggleVisibility onClick={handleToggleVisibility} type='button'>
                {passwordVisible ? <PasswordVisibleIcon /> : <PasswordHiddenIcon />}
              </ToggleVisibility>
            </InputContainer>
          </FormGroup>
          <Button
            type='submit'
            bgColor='var(--color-button-login)'
            hoverColor='var(--color-button-login-hover)'
            style={{ width: '100%' }}>
            Login
          </Button>
          <Link href='/forgot-password'>
            <Button
              type='button'
              bgColor='var(--color-button-forgot-password)'
              hoverColor='var(--color-button-forgot-password-hover)'
              style={{ width: '100%' }}>
              Forgot Password
            </Button>
          </Link>
        </ButtonContainer>
      </FormContainer>
      {showModal && <ModalPopup message={modalMessage} onOkClick={() => setShowModal(false)} isSending={isSending} />}
    </>
  );
}
