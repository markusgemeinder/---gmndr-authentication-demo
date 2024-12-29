// /app/components/Button/NavigationButtonPreviousPage.js

'use client';

import { useContext } from 'react';
import LanguageContext from '@/app/components/Provider/LanguageProvider';
import { getText } from '@/lib/languageLibrary';
import { NavigationButtonTemplate, ButtonSvg } from '@/app/components/Button/NavigationButtonTemplate';

export default function NavigationButtonPreviousPage({ onClick }) {
  const { language } = useContext(LanguageContext);

  const getLanguageText = (key) => {
    return getText('navigation_button_previous_page', key, language);
  };

  const svg = (
    <ButtonSvg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 20 20' width='24px'>
      <path d='M14.112,20l-10,-10l10,-10l1.775,1.775l-8.225,8.225l8.225,8.225l-1.775,1.775Z' />
    </ButtonSvg>
  );

  return (
    <NavigationButtonTemplate
      mobileTop='48%'
      mobileLeft='0.7rem'
      desktopTop='48%'
      desktopLeft='2rem'
      onClick={onClick}
      ariaLabel={getLanguageText('aria_label')}>
      {svg}
    </NavigationButtonTemplate>
  );
}
