import styled, { keyframes } from 'styled-components';

const blinkAnimation = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  margin-top: 5rem;
`;

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
