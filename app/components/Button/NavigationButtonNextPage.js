// /app/components/Button/NavigationButtonNextPage.js

'use client';

import { NavigationButtonTemplate, ButtonSvg } from '@/app/components/Button/NavigationButtonTemplate';

export default function NavigationButtonNextPage({ onClick }) {
  const svg = (
    <ButtonSvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
      <path d='M5.888,0l10,10l-10,10l-1.775,-1.775l8.225,-8.225l-8.225,-8.225l1.775,-1.775Z' />
    </ButtonSvg>
  );

  return (
    <NavigationButtonTemplate position={{ top: '48%', right: '0.4rem' }} onClick={onClick} ariaLabel='Next page'>
      {svg}
    </NavigationButtonTemplate>
  );
}
