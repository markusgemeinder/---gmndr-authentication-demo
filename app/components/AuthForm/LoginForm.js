// /app/components/AuthForm/LoginForm.js

'use client';

import { useState } from 'react';
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
import ModalPopup from '@/app/components/Common/ModalPopup'; // Import ModalPopup

export default function LoginForm({ onLogin, onOAuthLogin, error, onForgotPassword }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal state
  const [modalMessage, setModalMessage] = useState(''); // Modal message
  const [isSending, setIsSending] = useState(false); // State to handle loading

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleToggleVisibility = (e) => {
    e.preventDefault(); // Prevent the default button behavior
    setPasswordVisible(!passwordVisible);
  };

  // Neue Funktion zur Anzeige von Fehlern
  const showError = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      // Call the onLogin function to trigger the login process
      const loginSuccess = await onLogin(email, password);

      if (!loginSuccess) {
        showError('Login failed. Please check your email and password.');
      }
    } catch (error) {
      showError('An error occurred. Please try again later.');
    } finally {
      setIsSending(false);
    }
  };

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
              Forgot Password?
            </Button>
          </Link>
        </ButtonContainer>
      </FormContainer>
      {showModal && <ModalPopup message={modalMessage} onOkClick={() => setShowModal(false)} isSending={isSending} />}
    </>
  );
}
