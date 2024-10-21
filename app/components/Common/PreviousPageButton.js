// /app/components/Common/PreviousPageButton.js

'use client';

import React from 'react';
import styled from 'styled-components';

const PreviousPageButtonContainer = styled.div`
  display: flex;
  position: fixed;
  top: 48%;
  left: 0.7rem;
  margin: 0;
  justify-content: flex-start;
  z-index: 2;
  transition: opacity 0.6s ease;

  @media (min-width: 768px) and (min-height: 768px) {
    left: 3rem;
  }
`;

const PreviousPageButtonSvg = styled.svg`
  width: 24px;
  height: 24px;
  fill: var(--color-button-page-up-icon);
`;

const PreviousPageButtonLink = styled.button`
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

export default function PreviousPageButton({ onClick }) {
  return (
    <PreviousPageButtonContainer>
      <PreviousPageButtonLink onClick={onClick} aria-label='Previous page'>
        <PreviousPageButtonSvg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 20 20' width='24px'>
          <path d='M14.112,20l-10,-10l10,-10l1.775,1.775l-8.225,8.225l8.225,8.225l-1.775,1.775Z' />
        </PreviousPageButtonSvg>
      </PreviousPageButtonLink>
    </PreviousPageButtonContainer>
  );
}
