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

  const getLanguageText = (key) => {
    return getText('register_form', key, language);
  };

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
        message: getLanguageText('password_invalid'),
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
      message: getLanguageText('creating_account'),
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
        message: responseData.message || getLanguageText('registration_failed'),
        isSuccess: success,
        showOkButton: true,
      });
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
            {getLanguageText('confirm')}
          </Button>
          <Button
            type='button'
            onClick={() => router.push('/')}
            bgColor='var(--color-button-secondary)'
            hoverColor='var(--color-button-secondary-hover)'>
            {getLanguageText('cancel')}
          </Button>
        </ButtonContainerVertical>
      </FormContainer>

      {modalState.show && (
        <ModalPopup message={modalState.message} onOkClick={handleOkClick} showOkButton={modalState.showOkButton} />
      )}
    </>
  );
}
