'use client';
import SessionStatus from './components/Authentication/SessionStatus';
import { Container, Title } from '@/app/components/Common/CommonStyles';
import ScrollToTop from './components/Common/ScrollToTop';

export default function Home() {
  return (
    <Container>
      <ScrollToTop />
      <Title>#GMNDR Authentication Demo</Title>
      <SessionStatus />
    </Container>
  );
}
