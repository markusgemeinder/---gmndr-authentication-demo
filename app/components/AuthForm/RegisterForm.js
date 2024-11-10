// /app/components/AuthForm/RegisterForm.js

'use client';

import { useState, useRef, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Button, { ButtonContainerVertical } from '@/app/components/Button/Button';
import { FormContainer, InputGroup, LabelContainer, Label, Input } from '@/app/components/AuthForm/AuthFormStyles';
import ModalPopup from '@/app/components/Common/ModalPopup';
import ValidatePassword from '@/app/components/Common/ValidatePassword';
import LanguageContext from '@/app/components/LanguageProvider';
import { getText } from '@/lib/languageLibrary';

export default function RegisterForm() {
  const { language } = useContext(LanguageContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [modalState, setModalState] = useState({
    show: false,
    message: '',
    isSuccess: null,
    showOkButton: true,
  });

  const router = useRouter();
  const emailInputRef = useRef(null);

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!isPasswordValid) {
      setModalState({
        show: true,
        message: getText('register_form', 'password_invalid', language),
        isSuccess: false,
        showOkButton: true,
      });
      return;
    }

    const data = {
      email,
      password,
    };

    setModalState({
      show: true,
      message: getText('register_form', 'creating_account', language),
      isSuccess: null,
      showOkButton: false,
    });

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      const success = response.status === 201;

      setModalState({
        show: true,
        message: responseData.message || getText('register_form', 'registration_failed', language),
        isSuccess: success,
        showOkButton: true,
      });
    } catch (error) {
      setModalState({
        show: true,
        message: getText('register_form', 'unexpected_error', language),
        isSuccess: false,
        showOkButton: true,
      });
    }
  }

  function handleOkClick() {
    if (modalState.isSuccess) {
      router.push('/login');
    }
    setModalState((prevState) => ({ ...prevState, show: false }));
  }

  return (
    <>
      <FormContainer onSubmit={handleSubmit}>
        <InputGroup>
          <LabelContainer>
            <Label htmlFor='email'>{getText('register_form', 'email_label', language)}</Label>
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

        <ValidatePassword
          hasRepeatPassword={true}
          onPasswordValid={(isValid, pwd) => {
            setIsPasswordValid(isValid);
            if (isValid) {
              setPassword(pwd);
            } else {
              setPassword('');
            }
          }}
        />

        <ButtonContainerVertical>
          <Button
            type='submit'
            bgColor='var(--color-button-primary)'
            hoverColor='var(--color-button-primary-hover)'
            disabled={!isPasswordValid}>
            {getText('register_form', 'confirm', language)}
          </Button>
          <Button
            type='button'
            onClick={() => router.push('/')}
            bgColor='var(--color-button-secondary)'
            hoverColor='var(--color-button-secondary-hover)'>
            {getText('register_form', 'cancel', language)}
          </Button>
        </ButtonContainerVertical>
      </FormContainer>

      {modalState.show && (
        <ModalPopup message={modalState.message} onOkClick={handleOkClick} showOkButton={modalState.showOkButton} />
      )}
    </>
  );
}
