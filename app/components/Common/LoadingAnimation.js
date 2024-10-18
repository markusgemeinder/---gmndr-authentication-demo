// /app/components/Common/LoadingAnimation.js

'use client';

import styled, { keyframes } from 'styled-components';

// Keyframes for the blinking animation
const blinkAnimation = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

// Container for centering the blinking text
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; /* Center vertically */
  height: 100vh; /* Full viewport height */
  margin-top: 5rem; /* Add margin to top if needed */
`;

// Blinking text style
const BlinkingText = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  animation: ${blinkAnimation} 1s infinite;
`;

export default function LoadingAnimation() {
  return (
    <Container>
      <BlinkingText>Loading...</BlinkingText>
    </Container>
  );
}
