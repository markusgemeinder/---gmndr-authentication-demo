// /app/components/Common/LoadingAnimation.js

'use client';

import { useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { Container } from '@/app/components/Common/CommonStyles';
import LanguageContext from '@/app/components/Provider/LanguageProvider';
import { getText } from '@/lib/languageLibrary';

const blinkAnimation = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

const BlinkingText = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  animation: ${blinkAnimation} 1s infinite;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default function LoadingAnimation() {
  const { language } = useContext(LanguageContext);

  const getLanguageText = (key) => {
    return getText('loading_animation', key, language);
  };

  return (
    <Container>
      <BlinkingText>{getLanguageText('loading_text')}</BlinkingText>
    </Container>
  );
}
