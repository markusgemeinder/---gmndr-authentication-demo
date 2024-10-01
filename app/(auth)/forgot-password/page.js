// /app/(auth)/forgot-password/page.js

'use client';

import { Container, Title } from '@/app/components/Common/CommonStyles';
import ScrollToTop from '@/app/components/Common/ScrollToTop';

export default function ForgotPassword() {
  return (
    <Container>
      <ScrollToTop />
      <Title>Forgot Password</Title>
    </Container>
  );
}
