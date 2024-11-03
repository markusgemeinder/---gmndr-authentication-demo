// /app/components/Button/AuthButtonSvg.js

'use client';

import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

const AuthButtonLink = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 0.6rem;
  width: 100%;
  height: 48px;
  padding: 0 0.6rem;
  transition: background-color 0.3s ease;
  cursor: pointer;
  background-color: ${(props) => props.bgColor || 'transparent'};

  &:hover {
    background-color: ${(props) => props.hoverBgColor || 'transparent'};
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
    flex-direction: column;
  }
`;

const AuthButtonSvg = styled.svg`
  height: 32px;

  fill: var(--color-button-text);
  margin-right: 8px;

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    max-width: 32px;
    max-height: 32px;
    margin: 0;
  }
`;

const ButtonText = styled.span`
  display: block;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const LoginButton = ({ onCloseMenu, buttonText }) => {
  const router = useRouter();

  return (
    <AuthButtonLink
      bgColor='var(--color-button-login)'
      hoverBgColor='var(--color-button-login-hover)'
      type='button'
      onClick={() => {
        onCloseMenu();
        router.push('/login');
      }}>
      <AuthButtonSvg xmlns='http://www.w3.org/2000/svg' viewBox='0 -960 960 960'>
        <path d='M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z' />
      </AuthButtonSvg>
      <ButtonText>{buttonText}</ButtonText>
    </AuthButtonLink>
  );
};

export const LogoutButton = ({ onCloseMenu, buttonText }) => {
  return (
    <AuthButtonLink
      bgColor='var(--color-button-logout)'
      hoverBgColor='var(--color-button-logout-hover)'
      type='button'
      onClick={() => {
        onCloseMenu();
        signOut({ callbackUrl: '/' });
      }}>
      <AuthButtonSvg xmlns='http://www.w3.org/2000/svg' viewBox='0 -960 960 960'>
        <path d='M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z' />
      </AuthButtonSvg>
      <ButtonText>{buttonText}</ButtonText>
    </AuthButtonLink>
  );
};

export const RegisterButton = ({ onCloseMenu, buttonText }) => {
  const router = useRouter();

  return (
    <AuthButtonLink
      bgColor='var(--color-button-register)'
      hoverBgColor='var(--color-button-register-hover)'
      type='button'
      onClick={() => {
        onCloseMenu();
        router.push('/register');
      }}>
      <AuthButtonSvg xmlns='http://www.w3.org/2000/svg' viewBox='0 -960 960 960'>
        <path d='M80-160v-112q0-33 17-62t47-44q51-26 115-44t141-18q30 0 58.5 3t55.5 9l-70 70q-11-2-21.5-2H400q-71 0-127.5 17T180-306q-9 5-14.5 14t-5.5 20v32h250l80 80H80Zm542 16L484-282l56-56 82 82 202-202 56 56-258 258ZM400-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm10 240Zm-10-320q33 0 56.5-23.5T480-640q0-33-23.5-56.5T400-720q-33 0-56.5 23.5T320-640q0 33 23.5 56.5T400-560Zm0-80Z' />
      </AuthButtonSvg>
      <ButtonText>{buttonText}</ButtonText>
    </AuthButtonLink>
  );
};
