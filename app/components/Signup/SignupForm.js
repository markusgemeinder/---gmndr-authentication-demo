// /app/components/Signup/SignupForm.js

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import Button from '../Common/Button';
import { FaEye, FaEyeSlash, FaCheck } from 'react-icons/fa';

const FormContainer = styled.form`
  background-color: #f5f5f5;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 0.375rem;
  padding: 1rem;
  max-width: 32rem;
  margin: 2rem auto;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a5568;
  margin-right: 0.5rem;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  margin-top: 0.25rem;
  width: 100%;
  border-color: #e2e8f0;
  border-radius: 0.375rem;
  padding: 0.5rem;
  padding-right: 2.8rem; // Space for the visibility toggle button
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const ToggleVisibility = styled.button`
  position: absolute;
  top: 50%;
  right: 0.7rem;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #4a5568;
  display: flex;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const Warning = styled.div`
  color: ${(props) => (props.valid ? 'green' : 'red')};
  font-size: 0.875rem;
  margin-left: 0.5rem;
  display: flex;
  align-items: center;
`;

const PasswordQualityWarning = styled(Warning)`
  display: flex;
  align-items: center;
  margin-left: 1rem;
`;

const CheckIcon = styled(FaCheck)`
  color: green;
  margin-right: 0.5rem;
`;

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
        const errorText = await response.text();
        setError(`Signup failed: ${errorText}`);
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
          <Label htmlFor='username'>Username</Label>
        </LabelContainer>
        <Input id='username' type='text' value={username} onChange={(e) => setUsername(e.target.value)} required />
      </FormGroup>
      <FormGroup>
        <LabelContainer>
          <Label htmlFor='email'>Email</Label>
        </LabelContainer>
        <Input id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
      </FormGroup>
      <FormGroup>
        <LabelContainer>
          <Label htmlFor='password'>Password</Label>
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
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </ToggleVisibility>
        </InputContainer>
      </FormGroup>
      <FormGroup>
        <LabelContainer>
          <Label htmlFor='repeat-password'>Repeat Password</Label>
          {password === repeatPassword && repeatPassword && <CheckIcon />}
          {repeatPassword === '' && password.length > 0 && <Warning>Please enter.</Warning>}
          {password !== repeatPassword && repeatPassword && password.length > 0 && (
            <Warning>{`Passwords do not match.`}</Warning>
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
      {error && <Warning>{error}</Warning>}
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
