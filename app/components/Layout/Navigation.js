// /app/components/Layout/Navigation.js

'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useContext } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Button, { ButtonContainerHorizontal } from '@/app/components/Button/Button';
import ThemeToggleButton from '@/app/components/Button/ThemeToggleButton';
import LanguageContext from '@/app/components/LanguageProvider'; // Importieren des LanguageContext
import { getText } from '@/lib/languageLibrary'; // Importieren der Textfunktion

const Header = styled.header`
  background-color: var(--color-header);
  color: var(--color-header-text);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.6rem;
  height: 4rem;

  @media (min-width: 768px) and (min-height: 768px) {
    height: 5rem;
    padding: 0 1rem;
  }
`;

const BrandContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;

  @media (min-width: 768px) and (min-height: 768px) {
    gap: 1rem;
  }
`;

const Title = styled.div`
  font-size: 1rem;
  font-weight: bold;

  @media (min-width: 768px) and (min-height: 768px) {
    font-size: 1.25rem;
    margin: 1rem;
  }
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NavList = styled.ul`
  display: flex;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.li`
  list-style: none;
`;

const NavLink = styled(Link)`
  color: var(--color-header-text);
  text-decoration: none;
  border-bottom: ${({ $isActive }) => ($isActive ? '2px solid var(--color-header-text)' : 'none')};

  &:hover {
    color: var(--color-link);
  }

  &:active {
    color: var(--color-header-text);
  }
`;

const BurgerMenuButton = styled.button`
  background: none;
  border: none;
  color: var(--color-header-text);
  cursor: pointer;
  font-size: 1.5rem;
  display: none;
  width: 42px;
  height: 42px;

  @media (max-width: 768px) {
    display: block;
  }
`;

const BurgerMenuButtonSvg = styled.svg`
  width: 42px;
  height: 42px;
  stroke: var(--color-header-text);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 0.3s ease;

  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(45deg)' : 'rotate(0deg)')};
`;

const BurgerMenuNavigation = styled.nav`
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

const BurgerMenuList = styled.ul`
  list-style: none;
  padding: 1rem;
  margin: 0;
`;

const BurgerMenuItem = styled.li`
  padding: 1rem;
  text-align: left;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  z-index: 5;
`;

export default function Navigation() {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const { language, toggleLanguage } = useContext(LanguageContext); // Verwenden des LanguageContext

  const handleLinkClick = () => {
    if (isBurgerOpen) setIsBurgerOpen(false);
  };

  const renderNavLinks = () => (
    <>
      <NavItem>
        <NavLink href='/' $isActive={pathname === '/'} onClick={handleLinkClick}>
          {getText('navigation', 'home', language)} {/* Dynamische Sprache */}
        </NavLink>
      </NavItem>
      {!session && (
        <NavItem>
          <NavLink href='/forgot-password' $isActive={pathname === '/forgot-password'} onClick={handleLinkClick}>
            {getText('navigation', 'forgot_password', language)} {/* Dynamische Sprache */}
          </NavLink>
        </NavItem>
      )}
      {session && (
        <NavItem>
          <NavLink href='/reviews' $isActive={pathname === '/reviews'} onClick={handleLinkClick}>
            {getText('navigation', 'reviews', language)} {/* Dynamische Sprache */}
          </NavLink>
        </NavItem>
      )}
      <NavItem>
        <NavLink href='/about' $isActive={pathname === '/about'} onClick={handleLinkClick}>
          {getText('navigation', 'about', language)} {/* Dynamische Sprache */}
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href='#' onClick={() => toggleLanguage()}>
          {getText('test', 'switch_language', language)} {/* Dynamische Sprache */}
        </NavLink>
      </NavItem>
    </>
  );

  const renderBurgerMenuLinks = () => (
    <>
      <BurgerMenuItem>
        <NavLink href='/' $isActive={pathname === '/'} onClick={handleLinkClick}>
          {getText('navigation', 'home', language)} {/* Dynamische Sprache */}
        </NavLink>
      </BurgerMenuItem>
      {session && (
        <BurgerMenuItem>
          <NavLink href='/reviews' $isActive={pathname === '/reviews'} onClick={handleLinkClick}>
            {getText('navigation', 'reviews', language)} {/* Dynamische Sprache */}
          </NavLink>
        </BurgerMenuItem>
      )}
      <BurgerMenuItem>
        <NavLink href='/about' $isActive={pathname === '/about'} onClick={handleLinkClick}>
          {getText('navigation', 'about', language)} {/* Dynamische Sprache */}
        </NavLink>
      </BurgerMenuItem>
      {!session && (
        <BurgerMenuItem>
          <NavLink href='/forgot-password' $isActive={pathname === '/forgot-password'} onClick={handleLinkClick}>
            {getText('navigation', 'forgot_password', language)} {/* Dynamische Sprache */}
          </NavLink>
        </BurgerMenuItem>
      )}
      <BurgerMenuItem>
        <NavLink href='#' onClick={() => toggleLanguage()}>
          {getText('test', 'switch_language', language)} {/* Dynamische Sprache */}
        </NavLink>
      </BurgerMenuItem>
    </>
  );

  const renderSessionButtons = () => (
    <ButtonContainerHorizontal>
      <Button
        bgColor='var(--color-button-logout)'
        hoverColor='var(--color-button-logout-hover)'
        onClick={() => {
          signOut({ callbackUrl: '/' });
          if (isBurgerOpen) setIsBurgerOpen(false);
        }}>
        {getText('navigation', 'logout', language)} {/* Dynamische Sprache */}
      </Button>
    </ButtonContainerHorizontal>
  );

  const renderNoSessionButtons = () => (
    <ButtonContainerHorizontal>
      <Button
        bgColor='var(--color-button-login)'
        hoverColor='var(--color-button-login-hover)'
        onClick={() => {
          router.push('/login');
          if (isBurgerOpen) setIsBurgerOpen(false);
        }}>
        {getText('navigation', 'login', language)} {/* Dynamische Sprache */}
      </Button>
      <Button
        bgColor='var(--color-button-register)'
        hoverColor='var(--color-button-register-hover)'
        onClick={() => {
          router.push('/register');
          if (isBurgerOpen) setIsBurgerOpen(false);
        }}>
        {getText('navigation', 'register', language)} {/* Dynamische Sprache */}
      </Button>
    </ButtonContainerHorizontal>
  );

  return (
    <>
      <Header>
        <BrandContainer>
          <Title>MyApp</Title>
          {session ? renderSessionButtons() : renderNoSessionButtons()}
        </BrandContainer>
        <NavContainer>
          <NavList>{renderNavLinks()}</NavList>
          <ThemeToggleButton />
          <BurgerMenuButton
            onClick={() => setIsBurgerOpen(!isBurgerOpen)}
            aria-label='Toggle burger menu'
            aria-expanded={isBurgerOpen}>
            <BurgerMenuButtonSvg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              $isOpen={isBurgerOpen}>
              <path d='M4 6h16M4 12h16M4 18h16' />
            </BurgerMenuButtonSvg>
          </BurgerMenuButton>
        </NavContainer>
      </Header>
      <Overlay $isOpen={isBurgerOpen} onClick={() => setIsBurgerOpen(false)} />
      <BurgerMenuNavigation $isOpen={isBurgerOpen}>
        <BurgerMenuList>{renderBurgerMenuLinks()}</BurgerMenuList>
      </BurgerMenuNavigation>
    </>
  );
}
