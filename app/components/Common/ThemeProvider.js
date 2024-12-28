// /app/components/Common/ThemeProvider.js

'use client';

import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('authDemo_theme') || 'light';
      setTheme(storedTheme);
      document.documentElement.setAttribute('data-theme', storedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('authDemo_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
