// /app/components/Common/LoadingAnimation.js

'use client';

import styled, { keyframes } from 'styled-components';
import { Container } from '@/app/components/Common/CommonStyles';

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
  return (
    <Container>
      <BlinkingText>Loading...</BlinkingText>
    </Container>
  );
}
