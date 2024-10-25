// /app/components/AuthForm/RegisterForm.js

'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button, { ButtonContainerVertical } from '@/app/components/Common/Button';
import {
  FormContainer,
  InputGroup,
  LabelContainer,
  Label,
  InputContainer,
  Input,
} from '@/app/components/AuthForm/AuthFormStyles';
import ModalPopup from '@/app/components/Common/ModalPopup';
import ValidatePassword from '@/app/components/Common/ValidatePassword';

export default function RegisterForm() {
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
  const emailInputRef = useRef(null); // Ref für das E-Mail-Feld

  useEffect(() => {
    // Setzt den Fokus auf das E-Mail-Feld, wenn das Formular gerendert wird
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!isPasswordValid) {
      setModalState({
        show: true,
        message: 'Please ensure your password meets the requirements.',
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
      message: 'Preparing to create your account...',
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
        message: responseData.message || 'Registration failed.',
        isSuccess: success,
        showOkButton: true,
      });
    } catch (error) {
      setModalState({
        show: true,
        message: 'An unexpected error occurred.',
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
            bgColor='var(--color-button-login)'
            hoverColor='var(--color-button-login-hover)'
            disabled={!isPasswordValid}>
            Confirm
          </Button>
          <Button
            type='button'
            onClick={() => router.push('/')}
            bgColor='var(--color-button-cancel)'
            hoverColor='var(--color-button-cancel-hover)'>
            Cancel
          </Button>
        </ButtonContainerVertical>
      </FormContainer>

      {modalState.show && (
        <ModalPopup message={modalState.message} onOkClick={handleOkClick} showOkButton={modalState.showOkButton} />
      )}
    </>
  );
}
