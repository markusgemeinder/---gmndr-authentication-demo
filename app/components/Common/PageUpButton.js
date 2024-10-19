// /app/components/Common/PageUpButton.js

'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const PageUpButtonContainer = styled.div`
  display: flex;
  position: fixed;
  bottom: 3.5rem;
  right: 1rem;
  margin: 0;
  justify-content: flex-end;
  z-index: 2;
  transition: opacity 0.6s ease;
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
  width: 48px;
  height: 48px;

  &:hover {
    background-color: var(--color-button-page-up-hover);
  }
`;

const PageUpButtonSvg = styled.svg`
  width: 32px;
  height: 32px;
  fill: var(--color-button-page-up-icon);
  transform: translateY(15%);
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
      <PageUpButtonLink onClick={scrollToTop}>
        <PageUpButtonSvg xmlns='http://www.w3.org/2000/svg' height='32px' viewBox='0 -960 960 960' width='32px'>
          <path d='m256-424-56-56 280-280 280 280-56 56-224-223-224 223Z' />
        </PageUpButtonSvg>
      </PageUpButtonLink>
    </PageUpButtonContainer>
  );
}