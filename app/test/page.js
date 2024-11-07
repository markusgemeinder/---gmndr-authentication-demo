// /pages/test.js

'use client';

import { Container, Title } from '@/app/components/Common/CommonStyles';
import ScrollToTop from '@/app/components/Common/ScrollToTop';

import ColorPaletteGenerator from '@/app/components/Color/ColorPaletteGenerator';

export default function TestPage() {
  return (
    <Container>
      <ScrollToTop />
      <Title>Test</Title>
      <ColorPaletteGenerator />
    </Container>
  );
}
