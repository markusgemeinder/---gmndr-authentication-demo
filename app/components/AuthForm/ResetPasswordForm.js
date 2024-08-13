// /app/components/AuthForm/ResetPasswordForm.js

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/app/components/Common/Button';
import {
  FormContainer,
  Title,
  FormGroup,
  Label,
  Input,
  WarningMessage,
  ButtonContainer,
  InputContainer,
  ToggleVisibility,
  PasswordVisibleIcon,
  PasswordHiddenIcon,
} from './AuthFormStyles';

export default function ResetPasswordForm({ token }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    const response = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, password }),
    });
    const data = await response.json();
    if (data.success) {
      router.push('/login');
    } else {
      setMessage(data.message);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Title>Reset Password</Title>
      <FormGroup>
        <LabelContainer>
          <Label htmlFor='password'>New Password:</Label>
          <ToggleVisibility onClick={() => setPasswordVisible(!passwordVisible)}>
            {passwordVisible ? <PasswordVisibleIcon /> : <PasswordHiddenIcon />}
          </ToggleVisibility>
        </LabelContainer>
        <InputContainer>
          <Input
            id='password'
            type={passwordVisible ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </InputContainer>
      </FormGroup>
      <FormGroup>
        <LabelContainer>
          <Label htmlFor='confirm-password'>Confirm Password:</Label>
          <ToggleVisibility onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
            {confirmPasswordVisible ? <PasswordVisibleIcon /> : <PasswordHiddenIcon />}
          </ToggleVisibility>
        </LabelContainer>
        <InputContainer>
          <Input
            id='confirm-password'
            type={confirmPasswordVisible ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </InputContainer>
      </FormGroup>
      <ButtonContainer>
        <Button type='submit' bgColor='var(--color-button-save)' hoverColor='var(--color-button-save-hover)'>
          Reset Password
        </Button>
      </ButtonContainer>
      {message && <WarningMessage>{message}</WarningMessage>}
    </FormContainer>
  );
}
