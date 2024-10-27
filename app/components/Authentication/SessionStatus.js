// /app/components/Authentication/SessionStatus.js

'use client';

import styled from 'styled-components';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button, { ButtonContainerHorizontal } from '@/app/components/Button/Button';
import { ModalOverlay, ModalHeader, ModalContent, BlinkingText } from '@/app/components/Common/ModalPopup';
import { Paragraph, StyledLink } from '@/app/components/Common/CommonStyles';

const StatusContainer = styled.div`
  margin-bottom: 0.4rem;
  font-size: 0.875rem;
  color: var(--color-text-light);
`;

const CountdownContainer = styled.span`
  display: inline-block;
  width: 2.4rem;
  text-align: right;
`;

const Spacer = styled.div`
  margin-bottom: 1.4rem;
`;

const Timer = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
  color: var(--color-text-medium);
`;

const SessionStatusModalOverlay = styled(ModalOverlay)`
  z-index: 1100;
`;

export default function SessionStatus() {
  const { data: session } = useSession();
  const [timeLeft, setTimeLeft] = useState(300);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

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
            signOut({ redirect: false });
            sessionStorage.removeItem('timeLeft');
            router.push('/login');
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
  }, [session, router]);

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
    signOut({ redirect: false });
    router.push('/login');
    setShowPopup(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const userRole = session?.user.isDemoUser ? 'Demo User' : session?.user.role;

  return (
    <StatusContainer>
      {session ? (
        <>
          <Paragraph>
            Welcome, {session.user.email}. You are logged in as {userRole}. Your login expires in
            <CountdownContainer>{formatTime(timeLeft)}</CountdownContainer> min (
            <StyledLink href='#' onClick={renewSession}>
              renew session
            </StyledLink>
            ).
          </Paragraph>
          <Spacer />
          {showPopup && (
            <SessionStatusModalOverlay>
              <ModalContent>
                <ModalHeader>
                  <BlinkingText>Session Expiring Soon</BlinkingText>
                </ModalHeader>
                <Timer>{formatTime(timeLeft)}</Timer>
                <ButtonContainerHorizontal>
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
                </ButtonContainerHorizontal>
              </ModalContent>
            </SessionStatusModalOverlay>
          )}
        </>
      ) : (
        <>
          <Paragraph>
            Welcome! <StyledLink href='/login'>Log in</StyledLink> (including Demo User) or{' '}
            <StyledLink href='/register'>create an account</StyledLink> to access the Reviews area. And don&apos;t
            forget to leave a message :)
          </Paragraph>
        </>
      )}
    </StatusContainer>
  );
}
