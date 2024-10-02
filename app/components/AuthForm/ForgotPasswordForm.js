// /app/components/AuthForm/ForgotPasswordForm.js

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button, { ButtonContainer } from '@/app/components/Common/Button';
import { FormContainer, FormGroup, LabelContainer, Label, Input } from '@/app/components/AuthForm/AuthFormStyles';
import { ModalOverlay, ModalHeader, ModalContent, ModalButtonContainer } from '@/app/components/Common/ModalPopup';

const ModalPopup = ({ message, onOkClick }) => (
  <ModalOverlay>
    <ModalContent>
      <ModalHeader>{message}</ModalHeader>
      <ModalButtonContainer>
        <Button
          onClick={onOkClick}
          bgColor='var(--color-button-ok)'
          hoverColor='var(--color-button-ok-hover)'
          color='var(--color-button-text)'>
          OK
        </Button>
      </ModalButtonContainer>
    </ModalContent>
  </ModalOverlay>
);

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setModalMessage('Preparing email with reset link...');
    setShowModal(true);
    setIsError(false);

    const data = { email };

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        // Erfolgreich: Reset-Link wurde gesendet
        setModalMessage('Reset link sent to email.');
        setIsError(false);
      } else if (response.status === 400) {
        // Fehler: Email existiert nicht
        const result = await response.json();
        setModalMessage(result.message || 'No user registered with this email.');
        setIsError(true);
      } else {
        // Allgemeiner Fehlerfall
        const result = await response.json();
        setModalMessage(result.message || 'An error occurred.');
        setIsError(true);
      }
    } catch (error) {
      setModalMessage('An unexpected error occurred.');
      setIsError(true);
    }
  };

  const handleOkClick = () => {
    setShowModal(false);
    if (!isError) {
      router.push('/login');
    } else {
      router.push('/');
    }
  };

  return (
    <>
      <FormContainer onSubmit={handleSubmit}>
        <FormGroup>
          <LabelContainer>
            <Label htmlFor='email'>Email:</Label>
          </LabelContainer>
          <Input id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        </FormGroup>
        <ButtonContainer>
          <Button type='submit' bgColor='var(--color-button-login)' hoverColor='var(--color-button-login-hover)'>
            Send Reset Link
          </Button>
        </ButtonContainer>
      </FormContainer>

      {showModal && <ModalPopup message={modalMessage} onOkClick={handleOkClick} />}
    </>
  );
}
