'use client';

import styled from 'styled-components';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Button, { ButtonContainerHorizontal } from '@/app/components/Button/Button';
import { ModalOverlay, ModalHeader, ModalContent, BlinkingText } from '@/app/components/Common/ModalPopup';
import { Paragraph, StyledLink } from '@/app/components/Common/CommonStyles';
import LanguageContext from '@/app/components/Provider/LanguageProvider';
import { getText } from '@/lib/languageLibrary';

const StatusContainer = styled.div`
  margin-bottom: 0.4rem;
  color: var(--color-text-light);
`;

const SessionStatusText = styled(Paragraph)`
  margin: 0.2rem;
  color: var(--color-text-light);
`;

const CountdownContainer = styled.span`
  display: inline-block;
  width: 2.2rem;
  text-align: right;
`;

const Spacer = styled.div`
  margin-bottom: 1.4rem;
`;

const Timer = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
  color: var(--color-text);
`;

const SessionStatusModalOverlay = styled(ModalOverlay)`
  z-index: 1100;
`;

export default function SessionStatus() {
  const { language } = useContext(LanguageContext);
  const { data: session } = useSession();
  const [timeLeft, setTimeLeft] = useState(300);
  const [showPopup, setShowPopup] = useState(false);

  const getLanguageText = (key) => {
    return getText('session_status', key, language);
  };

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
            {getLanguageText('welcome')}
            <br />
            {userRole === 'Demo User' ? 'Demo User' : `${session.user.email} (${userRole})`}
          </SessionStatusText>
          <SessionStatusText>
            {getLanguageText('sessionExpires')}
            <CountdownContainer>{formatTime(timeLeft)}</CountdownContainer> min <br />(
            <StyledLink href='#' onClick={renewSession}>
              {getLanguageText('renewSession')}
            </StyledLink>
            ).
          </SessionStatusText>

          <Spacer />
          {showPopup && (
            <SessionStatusModalOverlay>
              <ModalContent>
                <ModalHeader>
                  <BlinkingText>{getLanguageText('sessionExpiringSoon')}</BlinkingText>
                </ModalHeader>
                <Timer>{formatTime(timeLeft)}</Timer>
                <ButtonContainerHorizontal>
                  <Button
                    onClick={renewSession}
                    bgColor='var(--color-button-primary)'
                    hoverColor='var(--color-button-primary-hover)'
                    color='var(--color-button-text)'>
                    {getLanguageText('renewSession')}
                  </Button>
                  <Button
                    onClick={handleLogout}
                    bgColor='var(--color-button-warning)'
                    hoverColor='var(--color-button-warning-hover)'
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
            {getLanguageText('loginPrompt_intro')}
            <StyledLink href='/login'>{getLanguageText('loginPrompt_logIn')}</StyledLink>
            {getLanguageText('loginPrompt_separator')}
            <StyledLink href='/register'>{getLanguageText('loginPrompt_signUp')}</StyledLink>
            {getLanguageText('loginPrompt_outro')}
          </SessionStatusText>
        </>
      )}
    </StatusContainer>
  );
}
