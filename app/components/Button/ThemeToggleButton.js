// /app/components/Button/ThemeToggleButton.js

'use client';

import styled from 'styled-components';
import { useContext } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { ThemeContext } from '@/app/components/Common/ThemeProvider';
import LanguageContext from '@/app/components/LanguageProvider';
import { getText } from '@/lib/languageLibrary';

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: var(--color-header-footer-text);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  cursor: pointer;

  &:hover {
    color: var(--color-link);
  }

  &:active {
    color: var(--color-header-footer-text);
  }

  &:focus {
    outline: none;
  }
`;

const StyledMoonIcon = styled(MoonIcon)`
  width: 30px;
  height: 30px;

  @media (min-width: 600px) and (max-width: 999px) and (orientation: portrait) {
    width: 36px;
    height: 36px;
  }
`;

const StyledSunIcon = styled(SunIcon)`
  width: 30px;
  height: 30px;

  @media (min-width: 600px) and (max-width: 999px) and (orientation: portrait) {
    width: 36px;
    height: 36px;
  }
`;

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  const getLanguageText = (key) => {
    return getText('theme_toggle_button', key, language);
  };

  const ariaLabel = getLanguageText('aria-label');

  return (
    <ToggleButton type='button' onClick={toggleTheme} aria-label={ariaLabel}>
      {theme === 'light' ? <StyledMoonIcon /> : <StyledSunIcon />}
    </ToggleButton>
  );
}
