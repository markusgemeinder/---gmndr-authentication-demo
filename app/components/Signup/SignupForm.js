// /app/components/Signup/SignupForm.js

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import Button from '../Common/Button';

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
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a5568;
`;

const Input = styled.input`
  margin-top: 0.25rem;
  width: 100%;
  border-color: #e2e8f0;
  border-radius: 0.375rem;
  padding: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

export default function SignupForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { username, email, password };

    console.log('Submitting data:', data); // Logging data to ensure it's correct

    try {
      const response = await fetch('/api/signup', {
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
        <Label htmlFor='username'>Username</Label>
        <Input id='username' type='text' value={username} onChange={(e) => setUsername(e.target.value)} required />
      </FormGroup>
      <FormGroup>
        <Label htmlFor='email'>Email</Label>
        <Input id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
      </FormGroup>
      <FormGroup>
        <Label htmlFor='password'>Password</Label>
        <Input id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
      </FormGroup>
      <ButtonContainer>
        <Button type='submit' bgColor='var(--color-button-save)' hoverColor='var(--color-button-save-hover)'>
          Signup
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
