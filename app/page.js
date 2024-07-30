'use client';
import styled from 'styled-components';
import SessionStatus from './components/Authentication/SessionStatus';
import ScrollToTop from './components/Common/ScrollToTop';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding: 0.5rem;
  margin-top: 5rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export default function Home() {
  return (
    <Container>
      <ScrollToTop />
      <Title>#GMNDR Authentication Demo</Title>
      <SessionStatus />
    </Container>
  );
}
