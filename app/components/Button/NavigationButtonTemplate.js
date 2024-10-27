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

  &:hover {
    background-color: var(--color-button-page-navigation-hover);
  }

  &:active {
    background-color: var(--color-button-page-navigation-hover);
    /* background-color: transparent; */
  }

  &:focus {
    outline: none;
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
