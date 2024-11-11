// /pages/color.js

'use client';

import { Container } from '@/app/components/Common/CommonStyles';
import ScrollToTop from '@/app/components/Common/ScrollToTop';

import PaletteGenerator from '@/app/components/Color/PaletteGenerator';

export default function ColoringPage() {
  return (
    <Container>
      <ScrollToTop />
      <PaletteGenerator />
    </Container>
  );
}
