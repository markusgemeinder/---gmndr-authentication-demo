// /app/components/AuthForm/ForgotPasswordForm.js

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/app/components/Common/Button';
import {
  FormContainer,
  FormGroup,
  LabelContainer,
  Label,
  Input,
  ButtonContainer,
} from '@/app/components/AuthForm/AuthFormStyles';
import {
  BlinkingText,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalButtonContainer,
} from '@/app/components/Common/ModalPopup';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isLinkSent, setIsLinkSent] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowModal(true);
    setModalMessage('Preparing email with reset link...');

    const response = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    setModalMessage('Reset link sent to email');
    setIsLinkSent(true);
  };

  const handleOkClick = () => {
    setShowModal(false);
    router.push('/');
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

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              {modalMessage !== 'Reset link sent to email' ? <BlinkingText>{modalMessage}</BlinkingText> : modalMessage}
            </ModalHeader>
            {isLinkSent && (
              <ModalButtonContainer>
                <Button
                  onClick={handleOkClick}
                  bgColor='var(--color-button-ok)'
                  hoverColor='var(--color-button-ok-hover)'
                  color='var(--color-button-text)'>
                  OK
                </Button>
              </ModalButtonContainer>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}
