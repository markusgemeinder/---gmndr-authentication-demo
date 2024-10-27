// /app/components/Button/NavigationButtonTemplate.js

'use client';

import styled from 'styled-components';

const ButtonContainer = styled.div`
  display: flex;
  position: fixed;
  z-index: 2;
  transition: opacity 0.6s ease;
`;

export const ButtonSvg = styled.svg`
  width: 24px;
  height: 24px;
  fill: var(--color-button-page-navigation-icon);
`;

const ButtonLink = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--color-button-page-navigation);
  background-color: transparent;
  color: var(--color-button-page-navigation-icon);
  cursor: pointer;
  border-radius: 0.6rem;
  width: 48px;
  height: 48px;
  transition: background-color 0.3s ease, transform 0.1s ease;

  &:hover {
    background-color: var(--color-button-page-navigation-hover);
  }

  &:active {
    /* background-color: var(--color-button-page-navigation-hover); */
    background-color: transparent;
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-button-page-navigation);
  }
`;

export const NavigationButtonTemplate = ({ position, children, onClick, ariaLabel }) => {
  return (
    <ButtonContainer style={position}>
      <ButtonLink type='button' onClick={onClick} aria-label={ariaLabel}>
        {children}
      </ButtonLink>
    </ButtonContainer>
  );
};
