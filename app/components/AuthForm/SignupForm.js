// /app/components/AuthForm/SignupForm.js

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
  PasswordQualityWarning,
  CheckIcon,
} from './AuthFormStyles';

export default function SignupForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [passwordQuality, setPasswordQuality] = useState('');
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
    const data = { username, email, password };

    console.log('Submitting data:', data); // Logging data to ensure it's correct

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('Signup response status:', response.status); // Log the response status

      if (response.ok) {
        router.push('/'); // Navigate to home after signup
      } else {
        const errorText = await response.json();
        if (errorText.message === 'Duplicate Email') {
          setError('An account with this email already exists. Please try logging in.');
        } else {
          setError(`Signup failed: ${errorText.message}`);
        }
        console.error('Signup failed:', errorText);
      }
    } catch (error) {
      setError('An unexpected error occurred.');
      console.error('Error signing up:', error);
    }
  };

  const handleCancel = () => {
    router.push('/');
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormGroup>
        <LabelContainer>
          <Label htmlFor='username'>Username:</Label>
        </LabelContainer>
        <Input id='username' type='text' value={username} onChange={(e) => setUsername(e.target.value)} required />
      </FormGroup>
      <FormGroup>
        <LabelContainer>
          <Label htmlFor='email'>Email:</Label>
        </LabelContainer>
        <Input id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
      </FormGroup>
      <FormGroup>
        <LabelContainer>
          <Label htmlFor='password'>Password:</Label>
          {passwordQuality === '' && password.length > 0 && <CheckIcon />}
          <PasswordQualityWarning valid={passwordQuality === '' && password.length > 0}>
            {passwordQuality}
          </PasswordQualityWarning>
        </LabelContainer>
        <InputContainer>
          <Input
            id='password'
            type={passwordVisible ? 'text' : 'password'}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              checkPasswordQuality(e.target.value); // Update password quality on change
            }}
            required
          />
          <ToggleVisibility onClick={() => setPasswordVisible(!passwordVisible)}>
            {passwordVisible ? <PasswordVisibleIcon /> : <PasswordHiddenIcon />}
          </ToggleVisibility>
        </InputContainer>

        <LabelContainer>
          <Label htmlFor='repeat-password'>Repeat Password:</Label>
          {password === repeatPassword && repeatPassword && <CheckIcon />}
          {repeatPassword === '' && password.length > 0 && <WarningMessage>Please enter.</WarningMessage>}
          {password !== repeatPassword && repeatPassword && password.length > 0 && (
            <WarningMessage>{`Passwords do not match.`}</WarningMessage>
          )}
        </LabelContainer>
        <Input
          id='repeat-password'
          type={passwordVisible ? 'text' : 'password'}
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          required
        />
      </FormGroup>
      {error && <WarningMessage>{error}</WarningMessage>}
      <ButtonContainer>
        <Button
          type='submit'
          bgColor='var(--color-button-save)'
          hoverColor='var(--color-button-save-hover)'
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
  );
}
