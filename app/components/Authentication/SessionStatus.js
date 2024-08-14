// /app/components/Authentication/SessionStatus.js

'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Button from '@/app/components/Common/Button';
import { ModalOverlay, ModalHeader, ModalContent, ModalButtonContainer } from '@/app/components/Common/ModalPopup';

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

const Timer = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const SessionStatus = () => {
  const { data: session } = useSession();
  const [timeLeft, setTimeLeft] = useState(300);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedTime = sessionStorage.getItem('timeLeft');
    if (savedTime) {
      setTimeLeft(parseInt(savedTime, 10));
    } else if (session) {
      setTimeLeft(300);
      sessionStorage.setItem('timeLeft', 300);
      setShowPopup(false);
    }

    let interval;
    if (session) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;
          if (newTime <= 0) {
            clearInterval(interval);
            signOut();
            sessionStorage.removeItem('timeLeft');
            return 0;
          }
          if (newTime === 30) {
            setShowPopup(true);
          }
          sessionStorage.setItem('timeLeft', newTime);
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [session]);

  useEffect(() => {
    if (!session) {
      sessionStorage.clear();
    }
  }, [session]);

  const renewSession = () => {
    setTimeLeft(300);
    sessionStorage.setItem('timeLeft', 300);
    setShowPopup(false);
  };

  const handleLogout = () => {
    sessionStorage.clear();
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
            Welcome, {session.user.username}. You are logged in as {session.user.role}. Login expires in{' '}
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
          Welcome, unknown user. <LoginLink href='/login'>Please login.</LoginLink>
        </p>
      )}
    </StatusContainer>
  );
};

export default SessionStatus;
