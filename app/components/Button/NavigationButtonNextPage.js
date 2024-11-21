// /app/components/Button/NavigationButtonNextPage.js

'use client';

import { useContext } from 'react';
import LanguageContext from '@/app/components/LanguageProvider';
import { getText } from '@/lib/languageLibrary';
import { NavigationButtonTemplate, ButtonSvg } from '@/app/components/Button/NavigationButtonTemplate';

export default function NavigationButtonNextPage({ onClick }) {
  const { language } = useContext(LanguageContext);

  const getLanguageText = (key) => {
    return getText('navigation_button_next_page', key, language);
  };

  const svg = (
    <ButtonSvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
      <path d='M5.888,0l10,10l-10,10l-1.775,-1.775l8.225,-8.225l-8.225,-8.225l1.775,-1.775Z' />
    </ButtonSvg>
  );

  return (
    <NavigationButtonTemplate
      mobileTop='48%'
      mobileRight='0.7rem'
      desktopTop='48%'
      desktopRight='2rem'
      onClick={onClick}
      ariaLabel={getLanguageText('aria_label')}>
      {svg}
    </NavigationButtonTemplate>
  );
}
