// /app/components/AuthForm/LoginForm.js

'use client';

import ScrollToTop from '@/app/components/Common/ScrollToTop';
import Button, { ButtonContainer } from '@/app/components/Common/Button';
import { FaEye, FaEyeSlash, FaCheck } from 'react-icons/fa';
import {
  Main,
  FormContainer,
  FormGroup,
  LabelContainer,
  Label,
  Input,
  WarningMessage,
  Divider,
  InputContainer,
} from './AuthFormStyles';

export default function LoginForm({ onLogin, onOAuthLogin, error, onForgotPassword }) {
  return (
    <>
      <ScrollToTop />
      <Main>
        <FormContainer
          onSubmit={(e) => {
            e.preventDefault();
            const email = e.target.email.value;
            const password = e.target.password.value;
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
            <InputContainer>
              <Label htmlFor='email'>Email:</Label>
              <Input id='email' type='email' name='email' />
              <Label htmlFor='password'>Password:</Label>
              <Input id='password' type='password' name='password' />
            </InputContainer>
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
              bgColor='var(--color-button-hover)'
              hoverColor='var(--color-button)'
              style={{ width: '100%' }}>
              Forgot Password
            </Button>
          </ButtonContainer>
        </FormContainer>
      </Main>
    </>
  );
}
