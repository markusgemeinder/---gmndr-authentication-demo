// /app/components/AuthForm/LoginForm.js

'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import Button, { ButtonContainerVertical } from '@/app/components/Button/Button';
import {
  FormContainer,
  InputGroup,
  LabelContainer,
  Label,
  Input,
  Divider,
  InputContainer,
  ToggleVisibility,
  PasswordVisibleIcon,
  PasswordHiddenIcon,
  IconButtonImage,
} from '@/app/components/AuthForm/AuthFormStyles';
import Link from 'next/link';
import ModalPopup from '@/app/components/Common/ModalPopup';

export default function LoginForm({ onLogin, onOAuthLogin, error, onDemoLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [modalState, setModalState] = useState({
    show: false,
    message: '',
    isSuccess: null,
    showOkButton: true,
  });

  const router = useRouter();
  const emailInputRef = useRef(null);
  const currentTime = new Date().getTime();

  useEffect(() => {
    if (error) {
      showError(error);
    }
  }, [error]);

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

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
    setModalState({
      show: true,
      message: message,
      isSuccess: false,
      showOkButton: true,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setModalState({
      show: true,
      message: 'Logging in...',
      isSuccess: null,
      showOkButton: false,
    });

    try {
      const loginSuccess = await onLogin(email, password);

      if (!loginSuccess) {
        showError(error);
      }
    } catch (error) {
      showError(error.message);
    }
  }

  async function handleDemoUserLogin(event) {
    event.preventDefault();
    setModalState({
      show: true,
      message: 'Logging in as Demo User...',
      isSuccess: null,
      showOkButton: false,
    });

    try {
      const demoSuccess = await onDemoLogin();

      if (!demoSuccess) {
        showError('Error logging in as Demo User');
      }
    } catch (error) {
      showError(error.message);
    }
  }

  function handleOkClick() {
    setModalState((prevState) => ({ ...prevState, show: false }));
    if (modalState.isSuccess) {
      router.push('/');
    }
  }

  return (
    <>
      <ScrollToTop />
      <FormContainer onSubmit={handleSubmit}>
        <ButtonContainerVertical>
          <Button
            type='button'
            bgColor='var(--color-button-demo-user)'
            hoverColor='var(--color-button-demo-user-hover)'
            style={{ width: '100%' }}
            onClick={handleDemoUserLogin}>
            Demo User
          </Button>

          <Button
            type='button'
            bgColor='var(--color-button-login)'
            hoverColor='var(--color-button-login-hover)'
            onClick={() => onOAuthLogin('github')}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconButtonImage src={`/images/github-logo.svg`} alt='GitHub Logo' width={20} height={20} />
            GitHub
          </Button>

          <Button
            type='button'
            bgColor='var(--color-button-login)'
            hoverColor='var(--color-button-login-hover)'
            onClick={() => onOAuthLogin('google')}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconButtonImage src={`/images/google-logo.svg`} alt='Google Logo' width={20} height={20} />
            Google
          </Button>
        </ButtonContainerVertical>

        <Divider>
          <span>or</span>
        </Divider>

        <InputGroup>
          <LabelContainer>
            <Label htmlFor='email'>Email:</Label>
          </LabelContainer>
          <Input
            id='email'
            type='email'
            name='email'
            value={email}
            onChange={handleEmailChange}
            required
            ref={emailInputRef}
          />
        </InputGroup>

        <InputGroup>
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
            <ToggleVisibility
              onClick={handleToggleVisibility}
              type='button'
              title={passwordVisible ? 'Hide password' : 'Show password'}
              aria-label={passwordVisible ? 'Hide password' : 'Show password'}>
              {passwordVisible ? <PasswordVisibleIcon /> : <PasswordHiddenIcon />}
            </ToggleVisibility>
          </InputContainer>
        </InputGroup>

        <ButtonContainerVertical>
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
        </ButtonContainerVertical>
      </FormContainer>

      {modalState.show && (
        <ModalPopup message={modalState.message} onOkClick={handleOkClick} showOkButton={modalState.showOkButton} />
      )}
    </>
  );
}
