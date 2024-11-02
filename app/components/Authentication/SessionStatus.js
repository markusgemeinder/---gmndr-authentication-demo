'use client';

import styled from 'styled-components';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Button, { ButtonContainerHorizontal } from '@/app/components/Button/Button';
import { ModalOverlay, ModalHeader, ModalContent, BlinkingText } from '@/app/components/Common/ModalPopup';
import { Paragraph, StyledLink } from '@/app/components/Common/CommonStyles';
import LanguageContext from '@/app/components/LanguageProvider';
import { getText } from '@/lib/languageLibrary';

const StatusContainer = styled.div`
  margin-bottom: 0.4rem;
  font-size: 0.875rem;
  color: var(--color-text-light);
`;

const SessionStatusText = styled(Paragraph)`
  font-size: 0.8rem;
  margin: 0.2rem;
  color: var(--color-text-medium);
`;

const CountdownContainer = styled.span`
  display: inline-block;
  width: 1.6rem;
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
  const { language } = useContext(LanguageContext);
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
          <SessionStatusText>
            {getText('session_status', 'welcome', language)}
            <br />
            {userRole === 'Demo User' ? 'Demo User' : `${session.user.email} (${userRole})`}
          </SessionStatusText>
          <SessionStatusText>
            {getText('session_status', 'sessionExpires', language)}
            <CountdownContainer>{formatTime(timeLeft)}</CountdownContainer> min <br />(
            <StyledLink href='#' onClick={renewSession}>
              {getText('session_status', 'renewSession', language)}
            </StyledLink>
            ).
          </SessionStatusText>

          <Spacer />
          {showPopup && (
            <SessionStatusModalOverlay>
              <ModalContent>
                <ModalHeader>
                  <BlinkingText>{getText('session_status', 'sessionExpiringSoon', language)}</BlinkingText>
                </ModalHeader>
                <Timer>{formatTime(timeLeft)}</Timer>
                <ButtonContainerHorizontal>
                  <Button
                    onClick={renewSession}
                    bgColor='var(--color-button-login)'
                    hoverColor='var(--color-button-login-hover)'
                    color='var(--color-button-text)'>
                    {getText('session_status', 'renewSession', language)}
                  </Button>
                  <Button
                    onClick={handleLogout}
                    bgColor='var(--color-button-logout)'
                    hoverColor='var(--color-button-logout-hover)'
                    color='var(--color-button-text)'>
                    {language === 'DE' ? 'Abmelden' : 'Logout'}
                  </Button>
                </ButtonContainerHorizontal>
              </ModalContent>
            </SessionStatusModalOverlay>
          )}
        </>
      ) : (
        <>
          <SessionStatusText>
            {getText('session_status', 'loginPrompt_intro', language)}
            <StyledLink href='/login'>{getText('session_status', 'loginPrompt_logIn', language)}</StyledLink>
            {getText('session_status', 'loginPrompt_separator', language)}
            <StyledLink href='/register'>{getText('session_status', 'loginPrompt_signUp', language)}</StyledLink>
            {getText('session_status', 'loginPrompt_outro', language)}
          </SessionStatusText>
        </>
      )}
    </StatusContainer>
  );
}
