// /app/components/Button/NavigationButtonTemplate.js

'use client';

import styled from 'styled-components';

const ButtonContainer = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    ![
      'mobileTop',
      'mobileBottom',
      'mobileLeft',
      'mobileRight',
      'desktopTop',
      'desktopBottom',
      'desktopLeft',
      'desktopRight',
    ].includes(prop), // Diese Props sollen nicht an das DOM weitergegeben werden
})`
  display: flex;
  position: fixed;
  z-index: 2;
  transition: opacity 0.6s ease;

  /* Mobile Position */
  top: ${(props) => props.mobileTop || 'initial'};
  bottom: ${(props) => props.mobileBottom || 'initial'};
  left: ${(props) => props.mobileLeft || 'initial'};
  right: ${(props) => props.mobileRight || 'initial'};

  /* Media Queries für Desktop */
  @media (min-width: 768px) and (min-height: 768px) {
    top: ${(props) => props.desktopTop || props.mobileTop || 'initial'};
    bottom: ${(props) => props.desktopBottom || props.mobileBottom || 'initial'};
    left: ${(props) => props.desktopLeft || props.mobileLeft || 'initial'};
    right: ${(props) => props.desktopRight || props.mobileRight || 'initial'};
  }
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
  /* transition: background-color 0.05s ease, transform 0.1s ease; */

  &:hover {
    background-color: var(--color-button-page-navigation-hover);
  }

  &:active {
    background-color: transparent;
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-button-page-navigation);
  }
`;

export const NavigationButtonTemplate = ({
  mobileTop,
  mobileBottom,
  mobileLeft,
  mobileRight,
  desktopTop,
  desktopBottom,
  desktopLeft,
  desktopRight,
  children,
  onClick,
  ariaLabel,
}) => {
  return (
    <ButtonContainer
      mobileTop={mobileTop}
      mobileBottom={mobileBottom}
      mobileLeft={mobileLeft}
      mobileRight={mobileRight}
      desktopTop={desktopTop}
      desktopBottom={desktopBottom}
      desktopLeft={desktopLeft}
      desktopRight={desktopRight}>
      <ButtonLink type='button' onClick={onClick} aria-label={ariaLabel}>
        {children}
      </ButtonLink>
    </ButtonContainer>
  );
};
