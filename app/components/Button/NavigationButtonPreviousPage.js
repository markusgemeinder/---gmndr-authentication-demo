// /app/components/Button/NavigationButtonPreviousPage.js

'use client';

import { NavigationButtonTemplate, ButtonSvg } from '@/app/components/Button/NavigationButtonTemplate';

export default function NavigationButtonPreviousPage({ onClick }) {
  const svg = (
    <ButtonSvg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 20 20' width='24px'>
      <path d='M14.112,20l-10,-10l10,-10l1.775,1.775l-8.225,8.225l8.225,8.225l-1.775,1.775Z' />
    </ButtonSvg>
  );

  return (
    <NavigationButtonTemplate position={{ top: '48%', left: '0.4rem' }} onClick={onClick} ariaLabel='Previous page'>
      {svg}
    </NavigationButtonTemplate>
  );
}
