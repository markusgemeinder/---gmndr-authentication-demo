'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Button from '../Common/Button';

const StatusContainer = styled.div`
  margin-bottom: 0.4rem;
  font-size: 0.875rem;
  color: var(--color-text-light);
`;

const LoginLink = styled.a`
  color: var(--color-link);
  text-decoration: underline;

  &:hover {
    color: var(--color-link-hover);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(31, 41, 55, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
`;

const ModalContent = styled.div`
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ModalHeader = styled.h2`
  font-size: 1.125rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
`;

const Timer = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const SessionStatus = () => {
  const { data: session } = useSession();
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = localStorage.getItem('timeLeft');
    return savedTime ? parseInt(savedTime, 10) : 180;
  });
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    let interval;

    if (session) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;
          localStorage.setItem('timeLeft', newTime);
          if (newTime <= 0) {
            clearInterval(interval);
            signOut();
            return 0;
          }
          if (newTime === 20) {
            setShowPopup(true);
          }
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [session]);

  const renewSession = () => {
    setTimeLeft(180);
    localStorage.setItem('timeLeft', 180);
    setShowPopup(false);
  };

  const handleLogout = () => {
    signOut();
    setShowPopup(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <StatusContainer>
      {session ? (
        <>
          <p>
            Welcome, {session.user.name}. You are logged in as {session.user.role}. Login expires in{' '}
            {formatTime(timeLeft)}{' '}
            <LoginLink href='#' onClick={renewSession}>
              (renew session)
            </LoginLink>
            .
          </p>
          {showPopup && (
            <ModalOverlay>
              <ModalContent>
                <ModalHeader>Session Expiring Soon</ModalHeader>
                <Timer>{formatTime(timeLeft)}</Timer>
                <ModalButtonContainer>
                  <Button
                    onClick={renewSession}
                    bgColor='var(--color-button-login)'
                    hoverColor='var(--color-button-login-hover)'
                    color='var(--color-button-text)'>
                    Renew Session
                  </Button>
                  <Button
                    onClick={handleLogout}
                    bgColor='var(--color-button-logout)'
                    hoverColor='var(--color-button-logout-hover)'
                    color='var(--color-button-text)'>
                    Logout
                  </Button>
                </ModalButtonContainer>
              </ModalContent>
            </ModalOverlay>
          )}
        </>
      ) : (
        <p>
          Welcome, unknown user.{' '}
          <LoginLink href='#' onClick={() => signIn()}>
            Please login.
          </LoginLink>
        </p>
      )}
    </StatusContainer>
  );
};

export default SessionStatus;
