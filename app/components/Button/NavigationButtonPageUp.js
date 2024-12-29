// /app/components/Button/NavigationButtonPageUp.js

'use client';

import { useState, useEffect, useContext } from 'react';
import LanguageContext from '@/app/components/Provider/LanguageProvider';
import { getText } from '@/lib/languageLibrary';
import { NavigationButtonTemplate, ButtonSvg } from '@/app/components/Button/NavigationButtonTemplate';

export default function NavigationButtonPageUp() {
  const { language } = useContext(LanguageContext);
  const [showButton, setShowButton] = useState(false);

  const getLanguageText = (key) => {
    return getText('navigation_button_page_up', key, language);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 60;
      setShowButton(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!showButton) return null;

  const svg = (
    <ButtonSvg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 20 20' width='24px'>
      <path d='M0,14.113l10,-10l10,10l-1.775,1.775l-8.225,-8.225l-8.225,8.225l-1.775,-1.775Z' />
    </ButtonSvg>
  );

  return (
    <NavigationButtonTemplate
      mobileBottom='3.5rem'
      mobileRight='0.7rem'
      desktopBottom='5rem'
      desktopRight='2rem'
      onClick={scrollToTop}
      ariaLabel={getLanguageText('aria_label')}>
      {svg}
    </NavigationButtonTemplate>
  );
}
