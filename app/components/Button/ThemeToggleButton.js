// /app/components/Button/ThemeToggleButton.js

'use client';

import styled from 'styled-components';
import { useContext } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { ThemeContext } from '@/app/components/Common/ThemeProvider';

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: var(--color-header-text);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  cursor: pointer;

  &:hover {
    color: var(--color-link);
  }

  &:active {
    color: var(--color-header-text);
  }

  &:focus {
    outline: none;
  }
`;

const StyledMoonIcon = styled(MoonIcon)`
  width: 42px;
  height: 42px;
`;

const StyledSunIcon = styled(SunIcon)`
  width: 48px;
  height: 48px;
`;

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <ToggleButton
      type='button'
      onClick={toggleTheme}
      aria-label={`Toggle to ${theme === 'light' ? 'dark' : 'light'} theme`}>
      {theme === 'light' ? <StyledMoonIcon /> : <StyledSunIcon />}
    </ToggleButton>
  );
}
