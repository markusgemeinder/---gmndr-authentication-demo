// /app/about/page.js

'use client';

import { Container, Title } from '@/app/components/Common/CommonStyles';
import ScrollToTop from '@/app/components/Common/ScrollToTop';

export default function Home() {
  return (
    <Container>
      <ScrollToTop />
      <Title>About This Project</Title>
    </Container>
  );
}
