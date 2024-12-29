// /app/components/AuthForm/LoginForm.js

'use client';

import { useState, useEffect, useRef, useContext } from 'react';
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
import LanguageContext from '@/app/components/Provider/LanguageProvider';
import { getText } from '@/lib/languageLibrary';

export default function LoginForm({ onLogin, onOAuthLogin, error, onDemoLogin }) {
  const { language } = useContext(LanguageContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [modalState, setModalState] = useState({
    show: false,
    message: '',
    isSuccess: null,
    showOkButton: true,
  });

  const getLanguageText = (key) => {
    return getText('login_form', key, language);
  };

  const router = useRouter();
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

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

    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
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
      message: getLanguageText('logging_in'),
      isSuccess: null,
      showOkButton: false,
    });

    try {
      const loginSuccess = await onLogin(email, password);

      if (!loginSuccess) {
        showError(getLanguageText('login_error'));
      }
    } catch (error) {
      showError(error.message);
    }
  }

  async function handleDemoUserLogin(event) {
    event.preventDefault();
    setModalState({
      show: true,
      message: getLanguageText('demo_logging_in'),
      isSuccess: null,
      showOkButton: false,
    });

    try {
      const demoSuccess = await onDemoLogin();

      if (!demoSuccess) {
        showError(getLanguageText('demo_error'));
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
            bgColor='var(--color-button-secondary)'
            hoverColor='var(--color-button-secondary-hover)'
            style={{ width: '100%' }}
            onClick={handleDemoUserLogin}>
            {getLanguageText('demo_user')}
          </Button>

          <Button
            type='button'
            bgColor='var(--color-button-primary)'
            hoverColor='var(--color-button-primary-hover)'
            onClick={() => onOAuthLogin('github')}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconButtonImage src={`/images/github-logo.svg`} alt='GitHub Logo' width={20} height={20} />
            GitHub
          </Button>

          <Button
            type='button'
            bgColor='var(--color-button-primary)'
            hoverColor='var(--color-button-primary-hover)'
            onClick={() => onOAuthLogin('google')}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconButtonImage src={`/images/google-logo.svg`} alt='Google Logo' width={20} height={20} />
            Google
          </Button>
        </ButtonContainerVertical>

        <Divider>
          <span>{getLanguageText('divider')}</span>
        </Divider>

        <InputGroup>
          <LabelContainer>
            <Label htmlFor='email'>{getLanguageText('email_label')}</Label>
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
            <Label htmlFor='password'>{getLanguageText('password_label')}</Label>
          </LabelContainer>
          <InputContainer>
            <Input
              id='password'
              type={passwordVisible ? 'text' : 'password'}
              name='password'
              value={password}
              onChange={handlePasswordChange}
              required
              ref={passwordInputRef}
            />
            <ToggleVisibility
              onClick={handleToggleVisibility}
              type='button'
              title={passwordVisible ? getLanguageText('hide_password') : getLanguageText('show_password')}
              aria-label={passwordVisible ? getLanguageText('hide_password') : getLanguageText('show_password')}>
              {passwordVisible ? <PasswordVisibleIcon /> : <PasswordHiddenIcon />}
            </ToggleVisibility>
          </InputContainer>
        </InputGroup>

        <ButtonContainerVertical>
          <Button
            type='submit'
            bgColor='var(--color-button-primary)'
            hoverColor='var(--color-button-primary-hover)'
            style={{ width: '100%' }}>
            {getLanguageText('login')}
          </Button>

          <Link href='/forgot-password'>
            <Button
              type='button'
              bgColor='var(--color-button-secondary)'
              hoverColor='var(--color-button-secondary-hover)'
              style={{ width: '100%' }}>
              {getLanguageText('forgot_password')}
            </Button>
          </Link>
          <Link href='/register'>
            <Button
              type='button'
              bgColor='var(--color-button-secondary)'
              hoverColor='var(--color-button-secondary-hover)'
              style={{ width: '100%' }}>
              {getLanguageText('register')}
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
