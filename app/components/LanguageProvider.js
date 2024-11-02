// /app/components/LanguageProvider.js

'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('EN');

  useEffect(() => {
    const match = document.cookie.match(/language=(EN|DE)/);
    if (match) {
      setLanguage(match[1]);
    } else {
      document.cookie = `language=EN; path=/`;
    }
  }, []);

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => {
      const newLanguage = prevLanguage === 'EN' ? 'DE' : 'EN';
      document.cookie = `language=${newLanguage}; path=/`;
      return newLanguage;
    });
  };

  return <LanguageContext.Provider value={{ language, toggleLanguage }}>{children}</LanguageContext.Provider>;
};

export default LanguageContext;
