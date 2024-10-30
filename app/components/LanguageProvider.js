// /app/components/LanguageProvider.js

'use client';

import React, { createContext, useState, useContext } from 'react';

// Create a context for language
const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

// LanguageProvider component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('EN'); // Default language is English

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'EN' ? 'DE' : 'EN'));
  };

  return <LanguageContext.Provider value={{ language, toggleLanguage }}>{children}</LanguageContext.Provider>;
};

// Export the LanguageContext for direct usage
export default LanguageContext;
