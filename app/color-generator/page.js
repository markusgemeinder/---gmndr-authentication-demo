// /pages/color.js

'use client';

import { Container } from '@/app/components/Common/CommonStyles';
import ScrollToTop from '@/app/components/Common/ScrollToTop';

import dynamic from 'next/dynamic';
const PaletteGenerator = dynamic(() => import('@/app/components/ColorPaletteGenerator/PaletteGenerator'), {
  ssr: false,
});

export default function ColorPage() {
  return (
    <Container>
      <ScrollToTop />
      <PaletteGenerator />
    </Container>
  );
}
