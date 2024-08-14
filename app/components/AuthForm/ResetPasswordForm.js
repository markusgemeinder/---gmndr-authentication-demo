'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/app/components/Common/Button';
import {
  FormContainer,
  Title,
  FormGroup,
  LabelContainer,
  Label,
  InputContainer,
  Input,
  WarningMessage,
  ButtonContainer,
  ToggleVisibility,
  PasswordVisibleIcon,
  PasswordHiddenIcon,
} from '@/app/components/AuthForm/AuthFormStyles';
import { ModalOverlay, ModalContent, ModalHeader, ModalButtonContainer } from '@/app/components/Common/ModalPopup';

export default function ResetPasswordForm({ token }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
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
      setShowSuccessModal(true); // Show the success modal
    } else {
      setMessage(data.message);
    }
  };

  const handlePasswordToggle = (e) => {
    e.preventDefault(); // Prevent the default button behavior
    setPasswordVisible(!passwordVisible);
  };

  const handleConfirmPasswordToggle = (e) => {
    e.preventDefault(); // Prevent the default button behavior
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    router.push('/'); // Redirect to home page after closing the modal
  };

  return (
    <>
      <FormContainer onSubmit={handleSubmit}>
        <Title>Reset Password</Title>
        <FormGroup>
          <LabelContainer>
            <Label htmlFor='password'>New Password:</Label>
            <ToggleVisibility onClick={handlePasswordToggle}>
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
            <ToggleVisibility onClick={handleConfirmPasswordToggle}>
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
          <Button type='submit' bgColor='var(--color-button-ok)' hoverColor='var(--color-button-ok-hover)'>
            Reset Password
          </Button>
        </ButtonContainer>
        {message && <WarningMessage>{message}</WarningMessage>}
      </FormContainer>

      {showSuccessModal && (
        <Modal>
          <ModalOverlay onClick={handleModalClose} />
          <ModalContent>
            <ModalHeader>New password successfully set! Please login.</ModalHeader>
            <ModalButtonContainer>
              <Button
                onClick={handleModalClose}
                bgColor='var(--color-button-ok)'
                hoverColor='var(--color-button-ok-hover)'>
                OK
              </Button>
            </ModalButtonContainer>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
