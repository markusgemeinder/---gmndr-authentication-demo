// /app/components/AuthForm/ForgotPasswordForm.js

'use client';

import { useEffect, useState, useRef, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Button, { ButtonContainerVertical } from '@/app/components/Button/Button';
import { FormContainer, InputGroup, LabelContainer, Label, Input } from '@/app/components/AuthForm/AuthFormStyles';
import ModalPopup from '@/app/components/Common/ModalPopup';
import LanguageContext from '@/app/components/LanguageProvider';
import { getText } from '@/lib/languageLibrary';

export default function ForgotPasswordForm() {
  const { language } = useContext(LanguageContext);
  const [email, setEmail] = useState('');
  const [modalState, setModalState] = useState({
    show: false,
    message: '',
    isSuccess: null,
    showOkButton: true,
  });

  const getLanguageText = (key) => {
    return getText('forgot_password_form', key, language);
  };

  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const emailInputRef = useRef(null);

  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      router.replace('/reviews');
    }
  }, [sessionStatus, router]);

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
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
        message: getLanguageText('invalid_email'),
        isSuccess: false,
        showOkButton: true,
      });
      return;
    }

    setModalState({
      show: true,
      message: getLanguageText('sending_email'),
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
          message: getLanguageText('reset_link_sent'),
          isSuccess: true,
          showOkButton: true,
        });
      } else {
        setModalState({
          show: true,
          message: result.message || getLanguageText('unexpected_error'),
          isSuccess: false,
          showOkButton: true,
        });
      }
    } catch (error) {
      setModalState({
        show: true,
        message: getLanguageText('unexpected_error'),
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
            <Label htmlFor='email'>{getLanguageText('email_label')}</Label>
          </LabelContainer>
          <Input
            id='email'
            type='email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            ref={emailInputRef}
          />
        </InputGroup>
        <ButtonContainerVertical>
          <Button type='submit' bgColor='var(--color-button-primary)' hoverColor='var(--color-button-primary-hover)'>
            {getLanguageText('send_reset_link')}
          </Button>
        </ButtonContainerVertical>
      </FormContainer>

      {modalState.show && (
        <ModalPopup message={modalState.message} onOkClick={handleOkClick} showOkButton={modalState.showOkButton} />
      )}
    </>
  );
}
