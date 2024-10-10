// /app/components/AuthForm/ForgotPasswordForm.js

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Button, { ButtonContainer } from '@/app/components/Common/Button';
import { FormContainer, FormGroup, LabelContainer, Label, Input } from '@/app/components/AuthForm/AuthFormStyles';
import ModalPopup from '@/app/components/Common/ModalPopup'; // Import der ausgelagerten ModalPopup-Komponente

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false); // Indicates if the request was successful
  const [isSending, setIsSending] = useState(false);
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  // Redirect user if already authenticated
  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      router.replace('/reviews');
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setModalMessage('Email not valid!');
      setShowModal(true);
      setIsSending(false);
      return; // Stop execution if email is invalid
    }

    setModalMessage('Preparing email with reset link...');
    setShowModal(true);
    setIsSending(true);
    setIsSuccess(false); // Reset success flag

    const data = { email };

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.status === 200) {
        setModalMessage('Reset link sent to email.');
        setIsSuccess(true); // Set success flag
      } else {
        // Show API's error message if response status is not 200
        setModalMessage(result.message || 'An error occurred.');
        setIsSuccess(false); // Set failure flag
      }
    } catch (error) {
      setModalMessage('An unexpected error occurred, please try again later.');
      setIsSuccess(false); // Set failure flag
    } finally {
      setIsSending(false); // Email sending process complete
    }
  };

  const handleOkClick = () => {
    setShowModal(false);

    // Only redirect if the email was successfully sent
    if (isSuccess) {
      router.push('/login');
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

      {showModal && <ModalPopup message={modalMessage} onOkClick={handleOkClick} isSending={isSending} />}
    </>
  );
}
