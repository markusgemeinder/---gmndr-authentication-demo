// /app/components/Common/PageUpButton.js

'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const PageUpButtonContainer = styled.div`
  display: flex;
  position: fixed;
  bottom: 3.5rem;
  right: 0.7rem;
  margin: 0;
  justify-content: flex-end;
  z-index: 2;
  transition: opacity 0.6s ease;

  @media (min-width: 768px) and (min-height: 768px) {
    bottom: 4.5rem;
    right: 3rem;
  }
`;

const PageUpButtonSvg = styled.svg`
  width: 24px;
  height: 24px;
  fill: var(--color-button-page-up-icon);
`;

const PageUpButtonLink = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--color-button-page-up);
  background-color: transparent;
  color: var(--color-button-page-up-icon);
  cursor: pointer;
  border-radius: 0.6rem;
  width: 48px; // Mindestgröße
  height: 48px;

  &:hover {
    background-color: var(--color-button-page-up-hover);
  }
`;

export default function PageUpButton() {
  const [showPageUpButton, setShowPageUpButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 60;
      setShowPageUpButton(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!showPageUpButton) return null;

  return (
    <PageUpButtonContainer>
      <PageUpButtonLink onClick={scrollToTop} aria-label='Scroll to top'>
        <PageUpButtonSvg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 20 20' width='24px'>
          <path d='M0,14.113l10,-10l10,10l-1.775,1.775l-8.225,-8.225l-8.225,8.225l-1.775,-1.775Z' />
        </PageUpButtonSvg>
      </PageUpButtonLink>
    </PageUpButtonContainer>
  );
}
