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
  BlinkingText, // Blinken für den Ladezustand
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
  const [isLoading, setIsLoading] = useState(false); // UX-Verbesserung: Ladezustand hinzufügen
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowModal(true);
    setModalMessage('Preparing email with reset link...');
    setIsLoading(true); // Ladezustand aktivieren

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.status === 200) {
        // Erfolg: Passwort-Reset-Link wurde gesendet
        setModalMessage('Reset link sent to email');
        setIsLinkSent(true);
      } else {
        // Fehler: Benutzer nicht gefunden oder andere Fehler
        setModalMessage(data.message || 'An error occurred');
        setIsLinkSent(false);
      }
    } catch (error) {
      setModalMessage('An unexpected error occurred. Please try again.');
      setIsLinkSent(false);
    } finally {
      setIsLoading(false); // Ladezustand beenden
    }
  };

  const handleOkClick = () => {
    setShowModal(false);
    if (isLinkSent) {
      // Nur bei Erfolg weiterleiten
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
          <Button
            type='submit'
            bgColor='var(--color-button-login)'
            hoverColor='var(--color-button-login-hover)'
            disabled={isLoading} // Button deaktivieren, wenn der Ladezustand aktiv ist
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'} {/* Ladezustand anzeigen */}
          </Button>
        </ButtonContainer>
      </FormContainer>

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              {isLoading ? ( // Blinken während des Ladevorgangs
                <BlinkingText>{modalMessage}</BlinkingText>
              ) : (
                modalMessage // Nach Abschluss statische Nachricht
              )}
            </ModalHeader>
            {!isLoading && ( // OK-Button nur nach Abschluss der Anfrage anzeigen
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
