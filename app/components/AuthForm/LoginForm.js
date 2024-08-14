// /app/components/AuthForm/LoginForm.js

'use client';

import { useState } from 'react';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import Button from '@/app/components/Common/Button';
import {
  FormContainer,
  FormGroup,
  LabelContainer,
  Label,
  Input,
  WarningMessage,
  Divider,
  InputContainer,
  ToggleVisibility,
  PasswordVisibleIcon,
  PasswordHiddenIcon,
  ButtonContainer,
} from './AuthFormStyles';

export default function LoginForm({ onLogin, onOAuthLogin, error, onForgotPassword }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <ScrollToTop />
      <FormContainer
        onSubmit={(e) => {
          e.preventDefault();
          onLogin(email, password);
        }}>
        <ButtonContainer>
          <Button
            type='button'
            bgColor='var(--color-button-login)'
            hoverColor='var(--color-button-login-hover)'
            onClick={() => onOAuthLogin('github')}
            style={{ width: '100%' }}>
            Login with GitHub
          </Button>
          <Button
            type='button'
            bgColor='var(--color-button-login)'
            hoverColor='var(--color-button-login-hover)'
            onClick={() => onOAuthLogin('google')}
            style={{ width: '100%' }}>
            Login with Google
          </Button>
          <Divider>
            <span>or</span>
          </Divider>
          <FormGroup>
            <LabelContainer>
              <Label htmlFor='email'>Email:</Label>
            </LabelContainer>
            <Input id='email' type='email' name='email' value={email} onChange={handleEmailChange} />
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
                onChange={(e) => setPassword(e.target.value)}
              />
              <ToggleVisibility onClick={() => setPasswordVisible(!passwordVisible)}>
                {passwordVisible ? <PasswordVisibleIcon /> : <PasswordHiddenIcon />}
              </ToggleVisibility>
            </InputContainer>
          </FormGroup>
          {error && <WarningMessage>{error}</WarningMessage>}
          <Button
            type='submit'
            bgColor='var(--color-button-login)'
            hoverColor='var(--color-button-login-hover)'
            style={{ width: '100%' }}>
            Login
          </Button>
          <Button
            type='button'
            onClick={onForgotPassword}
            bgColor='var(--color-button)'
            hoverColor='var(--color-button-hover)'
            style={{ width: '100%' }}>
            Forgot Password
          </Button>
        </ButtonContainer>
      </FormContainer>
    </>
  );
}
