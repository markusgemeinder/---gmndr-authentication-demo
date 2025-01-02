// /app/components/Provider/LanguageProvider.js

'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import { useCookies } from 'react-cookie';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [cookies, setCookie] = useCookies(['language']);
  const [language, setLanguage] = useState(null);

  useEffect(() => {
    if (cookies.language) {
      setLanguage(cookies.language);
    } else {
      setCookie('language', 'EN', { path: '/' });
      setLanguage('EN');
    }
  }, [cookies, setCookie]);

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => {
      const newLanguage = prevLanguage === 'EN' ? 'DE' : 'EN';
      setCookie('language', newLanguage, { path: '/' });
      return newLanguage;
    });
  };

  const setLanguagePreference = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    setCookie('language', selectedLanguage, { path: '/' });
  };

  if (language === null) {
    return null; // Verhindert das Rendern vor der Hydration
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguagePreference }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
