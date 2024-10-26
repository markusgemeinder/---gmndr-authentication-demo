// /app/components/AuthForm/ForgotPasswordForm.js

'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Button, { ButtonContainerVertical } from '@/app/components/Common/Button';
import { FormContainer, InputGroup, LabelContainer, Label, Input } from '@/app/components/AuthForm/AuthFormStyles';
import ModalPopup from '@/app/components/Common/ModalPopup';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [modalState, setModalState] = useState({
    show: false,
    message: '',
    isSuccess: null,
    showOkButton: true,
  });

  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const emailInputRef = useRef(null); // Ref für das E-Mail-Feld

  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      router.replace('/reviews');
    }
  }, [sessionStatus, router]);

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus(); // Setzt den Fokus auf das E-Mail-Feld
    }
  }, []);

  function isValidEmail(email) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setModalState({
        show: true,
        message: 'Please enter a valid email address.',
        isSuccess: false,
        showOkButton: true,
      });
      return;
    }

    setModalState({
      show: true,
      message: 'Preparing to send your password reset link...',
      isSuccess: null,
      showOkButton: false,
    });

    const data = { email };

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.status === 200) {
        setModalState({
          show: true,
          message: 'A password reset link has been sent to your email.',
          isSuccess: true,
          showOkButton: true,
        });
      } else {
        setModalState({
          show: true,
          message: result.message || 'An unexpected error occurred. Please try again later.',
          isSuccess: false,
          showOkButton: true,
        });
      }
    } catch (error) {
      setModalState({
        show: true,
        message: 'An unexpected error occurred. Please try again later.',
        isSuccess: false,
        showOkButton: true,
      });
    }
  }

  function handleOkClick() {
    setModalState((prevState) => ({ ...prevState, show: false }));

    if (modalState.isSuccess) {
      router.push('/login');
    }
  }

  return (
    <>
      <FormContainer onSubmit={handleSubmit}>
        <InputGroup>
          <LabelContainer>
            <Label htmlFor='email'>Email:</Label>
          </LabelContainer>
          <Input
            id='email'
            type='email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            ref={emailInputRef} // Weist den Ref dem E-Mail-Input zu
          />
        </InputGroup>
        <ButtonContainerVertical>
          <Button type='submit' bgColor='var(--color-button-login)' hoverColor='var(--color-button-login-hover)'>
            Send Reset Link
          </Button>
        </ButtonContainerVertical>
      </FormContainer>

      {modalState.show && (
        <ModalPopup message={modalState.message} onOkClick={handleOkClick} showOkButton={modalState.showOkButton} />
      )}
    </>
  );
}
