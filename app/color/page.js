// /pages/test.js

'use client';

import { Container, Title } from '@/app/components/Common/CommonStyles';
import ScrollToTop from '@/app/components/Common/ScrollToTop';

import MonochromePaletteGenerator from '@/app/components/Color/MonochromePaletteGenerator';

export default function ColoringPage() {
  return (
    <Container>
      <ScrollToTop />
      <Title>Color Variables</Title>
      <MonochromePaletteGenerator />
    </Container>
  );
}
