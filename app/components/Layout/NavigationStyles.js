// /app/components/Layout/NavigationStyles.js

import styled from 'styled-components';
import Link from 'next/link';

export const Header = styled.header`
  background-color: var(--color-header-footer);
  color: var(--color-header-footer-text);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.8rem;
  height: 4.4rem;

  /* Smartphones im Querformat */
  @media (min-width: 600px) and (max-width: 999px) and (orientation: landscape) {
    height: 4.4rem;
    padding: 0 1.6rem;
  }

  /* Tablets im Hochformat */
  @media (min-width: 600px) and (max-width: 999px) and (orientation: portrait) {
    padding: 0 1.6rem;
    height: 5rem;
  }

  /* Desktop & Tablets im Querformat */
  @media (min-width: 1000px) {
    padding: 0 1.6rem;
    height: 5rem;
  }
`;

export const BrandContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.4rem;

  @media (max-width: 768px) {
    gap: 0.8rem;
  }

  @media (min-width: 600px) and (max-width: 999px) and (orientation: landscape) {
    gap: 1.4rem;
  }

  @media (min-width: 600px) and (max-width: 999px) and (orientation: portrait) {
    gap: 1.4rem;
  }

  @media (min-width: 1000px) {
    gap: 1.4rem;
  }
`;

export const ShakeAnimation = styled.div`
  display: inline-block;
  animation: ${({ $isShaking }) => ($isShaking ? 'shake 0.3s' : 'none')};

  @keyframes shake {
    0% {
      transform: translate(0);
    }
    25% {
      transform: translate(-2px, 0);
    }
    50% {
      transform: translate(2px, 0);
    }
    75% {
      transform: translate(-2px, 0);
    }
    100% {
      transform: translate(0);
    }
  }
`;

export const NavContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;

  @media (min-width: 600px) and (max-width: 999px) and (orientation: portrait) {
    gap: 1rem;
  }

  @media (min-width: 1000px) {
    gap: 1rem;
  }
`;

export const NavList = styled.ul`
  display: none;

  @media (min-width: 1000px) {
    display: flex;
    /* gap: 0.4rem; */
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;

export const NavItem = styled.li`
  list-style: none;

  @media (min-width: 1000px) {
    margin: 0 0.5rem;
  }
`;

export const NavLink = styled(Link)`
  color: var(--color-header-footer-text);
  text-decoration: none;
  border-bottom: ${({ $isActive }) => ($isActive ? '2px solid var(--color-header-footer-text)' : 'none')};

  &:hover {
    color: var(--color-link);
  }
`;

export const BurgerMenuButton = styled.button`
  background: none;
  border: none;
  color: var(--color-header-footer-text);
  cursor: pointer;
  font-size: 1.2rem;
  display: block;
  width: 36px;
  height: 36px;

  @media (min-width: 600px) and (max-width: 999px) and (orientation: portrait) {
    font-size: 1.5rem;
    width: 42px;
    height: 42px;
  }

  @media (min-width: 1000px) {
    display: none;
  }
`;

export const BurgerMenuButtonSvg = styled.svg`
  width: 36px;
  height: 36px;
  stroke: var(--color-header-footer-text);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 0.3s ease;

  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(-25deg)' : 'rotate(0deg)')};

  @media (min-width: 600px) and (max-width: 999px) and (orientation: portrait) {
    width: 42px;
    height: 42px;
  }
`;

export const BurgerMenuNavigation = styled.nav`
  position: fixed;
  top: 4.4rem;
  left: 0;
  width: 60%;
  height: 100vh;
  background-color: var(--color-burger-menu-background);
  transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.3s ease-in-out;
  z-index: 10;

  @media (min-width: 600px) and (max-width: 999px) and (orientation: landscape) {
    top: 4.4rem;
    width: 40%;
  }

  @media (min-width: 600px) and (max-width: 999px) and (orientation: portrait) {
    top: 5rem;
    width: 40%;
  }

  @media (min-width: 1000px) {
    display: none;
  }
`;

export const BurgerMenuList = styled.ul`
  list-style: none;
  padding: 0.8rem;
  margin: 0;

  @media (min-width: 600px) and (max-width: 999px) and (orientation: portrait) {
    padding: 1.6rem;
  }
`;

export const BurgerMenuItem = styled.li`
  padding: 0.6rem 1rem;
  text-align: left;

  @media (min-width: 600px) and (max-width: 999px) and (orientation: portrait) {
    padding: 0.8rem 1rem;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  z-index: 5;
`;
