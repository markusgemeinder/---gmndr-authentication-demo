// /app/components/Common/NextPageButton.js

'use client';

import React from 'react';
import styled from 'styled-components';

const NextPageButtonContainer = styled.div`
  display: flex;
  position: fixed;
  top: 30%;
  right: 1rem;
  margin: 0;
  justify-content: flex-end;
  z-index: 2;
  transition: opacity 0.6s ease;
`;

const NextPageButtonSvg = styled.svg`
  width: 24px;
  height: 24px;
  fill: var(--color-button-page-up-icon);
`;

const NextPageButtonLink = styled.button`
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

export default function NextPageButton({ onClick }) {
  return (
    <NextPageButtonContainer>
      <NextPageButtonLink onClick={onClick} aria-label='Next page'>
        <NextPageButtonSvg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 20 20' width='24px'>
          <path d='M5.888,0l10,10l-10,10l-1.775,-1.775l8.225,-8.225l-8.225,-8.225l1.775,-1.775Z' />
        </NextPageButtonSvg>
      </NextPageButtonLink>
    </NextPageButtonContainer>
  );
}
