// /app/page.js

'use client';

import SessionStatus from '@/app/components/Authentication/SessionStatus';
import { Container, Title } from '@/app/components/Common/CommonStyles';
import ScrollToTop from '@/app/components/Common/ScrollToTop';

export default function Home() {
  return (
    <Container>
      <ScrollToTop />
      <Title>#GMNDR Authentication Demo</Title>
      <SessionStatus />
    </Container>
  );
}
