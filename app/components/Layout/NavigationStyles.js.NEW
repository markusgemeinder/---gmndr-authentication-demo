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
  padding: 0 1.6rem;
  height: 5rem;

  @media (max-width: 768px) {
    padding: 0 0.75rem;
    height: 4rem;
  }
`;

export const BrandContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.4rem;

  @media (max-width: 768px) {
    gap: 0.6rem;
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

// export const Logo = styled.div`
//   display: flex;
//   align-items: center;
//   flex-direction: column;
//   cursor: pointer;
// `;

// export const Title1 = styled.div`
//   font-size: 0.75rem;
//   font-weight: 700;

//   @media (max-width: 768px) {
//     font-size: 0.6rem;
//   }
// `;

// export const Title2 = styled.div`
//   font-size: 1.2rem;
//   font-weight: 700;

//   @media (max-width: 768px) {
//     font-size: 1rem;
//   }
// `;

export const NavContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const NavList = styled.ul`
  display: flex;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavItem = styled.li`
  list-style: none;
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
  font-size: 1.5rem;
  display: none;
  width: 42px;
  height: 42px;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const BurgerMenuButtonSvg = styled.svg`
  width: 42px;
  height: 42px;
  stroke: var(--color-header-footer-text);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 0.3s ease;

  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(-25deg)' : 'rotate(0deg)')};
`;

export const BurgerMenuNavigation = styled.nav`
  position: fixed;
  top: 4rem;
  left: 0;
  width: 56%;
  height: 100vh;
  background-color: var(--color-burger-menu-background);
  transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.3s ease-in-out;
  z-index: 10;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const BurgerMenuList = styled.ul`
  list-style: none;
  padding: 1rem;
  margin: 0;
`;

export const BurgerMenuItem = styled.li`
  padding: 1rem;
  text-align: left;
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
