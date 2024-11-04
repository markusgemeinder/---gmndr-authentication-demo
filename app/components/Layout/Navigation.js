// /app/components/Layout/Navigation.js

'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useContext } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import ThemeToggleButton from '@/app/components/Button/ThemeToggleButton';
import LanguageContext from '@/app/components/LanguageProvider';
import { getText } from '@/lib/languageLibrary';
import { LoginButton, LogoutButton, RegisterButton } from '@/app/components/Button/AuthButtonSvg';
import { ButtonContainerHorizontal } from '@/app/components/Button/Button';

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
  padding: 0 1.6rem;
  height: 5rem;

  @media (max-width: 768px) {
    padding: 0 0.75rem;
    height: 4rem;
  }
`;

const BrandContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.4rem;

  @media (max-width: 768px) {
    gap: 0.6rem;
  }
`;

const ShakeAnimation = styled.div`
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

const Logo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
`;

const Title1 = styled.div`
  font-size: 0.75rem;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 0.6rem;
  }
`;

const Title2 = styled.div`
  font-size: 1.2rem;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 1rem;
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

  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(-25deg)' : 'rotate(0deg)')};
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
  const [isShaking, setIsShaking] = useState(false); // Zustand für den Wackeleffekt
  const { language, toggleLanguage } = useContext(LanguageContext);

  const handleLinkClick = () => {
    if (isBurgerOpen) setIsBurgerOpen(false);
  };

  const handleLogoClick = () => {
    if (pathname === '/') {
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
      }, 300); // Dauer der Animation
    } else {
      router.push('/');
    }
  };

  const renderNavLinks = () => (
    <>
      {!session && (
        <NavItem>
          <NavLink href='/forgot-password' $isActive={pathname === '/forgot-password'} onClick={handleLinkClick}>
            {getText('navigation', 'forgot_password', language)}
          </NavLink>
        </NavItem>
      )}
      <NavItem>
        <NavLink href='/' $isActive={pathname === '/'} onClick={handleLinkClick}>
          {getText('navigation', 'home', language)}
        </NavLink>
      </NavItem>
      {session && (
        <NavItem>
          <NavLink href='/reviews' $isActive={pathname === '/reviews'} onClick={handleLinkClick}>
            {getText('navigation', 'reviews', language)}
          </NavLink>
        </NavItem>
      )}
      <NavItem>
        <NavLink href='/info' $isActive={pathname === '/info'} onClick={handleLinkClick}>
          {getText('navigation', 'info', language)}
        </NavLink>
      </NavItem>
    </>
  );

  const renderBurgerMenuLinks = () => (
    <>
      <BurgerMenuItem>
        <NavLink href='/' $isActive={pathname === '/'} onClick={handleLinkClick}>
          {getText('navigation', 'home', language)}
        </NavLink>
      </BurgerMenuItem>

      {session ? (
        <>
          <BurgerMenuItem>
            <NavLink href='/reviews' $isActive={pathname === '/reviews'} onClick={handleLinkClick}>
              {getText('navigation', 'reviews', language)}
            </NavLink>
          </BurgerMenuItem>
          <BurgerMenuItem>
            <NavLink href='/info' $isActive={pathname === '/info'} onClick={handleLinkClick}>
              {getText('navigation', 'info', language)}
            </NavLink>
          </BurgerMenuItem>
          <BurgerMenuItem>
            <NavLink href='#' onClick={() => signOut({ callbackUrl: '/' })}>
              {getText('navigation', 'logout', language)}
            </NavLink>
          </BurgerMenuItem>
        </>
      ) : (
        <>
          <BurgerMenuItem>
            <NavLink href='/login' $isActive={pathname === '/login'} onClick={handleLinkClick}>
              {getText('navigation', 'login', language)}
            </NavLink>
          </BurgerMenuItem>
          <BurgerMenuItem>
            <NavLink href='/register' $isActive={pathname === '/register'} onClick={handleLinkClick}>
              {getText('navigation', 'register', language)}
            </NavLink>
          </BurgerMenuItem>
          <BurgerMenuItem>
            <NavLink href='/forgot-password' $isActive={pathname === '/forgot-password'} onClick={handleLinkClick}>
              {getText('navigation', 'forgot_password', language)}
            </NavLink>
          </BurgerMenuItem>
          <BurgerMenuItem>
            <NavLink href='/info' $isActive={pathname === '/info'} onClick={handleLinkClick}>
              {getText('navigation', 'info', language)}
            </NavLink>
          </BurgerMenuItem>
        </>
      )}
    </>
  );

  const renderSessionButtons = () => {
    const logoutText = getText('navigation', 'logout', language);

    return (
      <ButtonContainerHorizontal>
        <LogoutButton
          buttonText={logoutText}
          onCloseMenu={handleLinkClick}
          aria-label={logoutText}
          title={logoutText}
        />
      </ButtonContainerHorizontal>
    );
  };

  const renderNoSessionButtons = () => {
    const loginText = getText('navigation', 'login', language);
    const registerText = getText('navigation', 'register', language);

    return (
      <ButtonContainerHorizontal>
        <LoginButton buttonText={loginText} onCloseMenu={handleLinkClick} aria-label={loginText} title={loginText} />
        <RegisterButton
          buttonText={registerText}
          onCloseMenu={handleLinkClick}
          aria-label={registerText}
          title={registerText}
        />
      </ButtonContainerHorizontal>
    );
  };

  return (
    <>
      <Header>
        <BrandContainer>
          <ShakeAnimation $isShaking={isShaking}>
            <Logo onClick={handleLogoClick}>
              <Title1>#GMNDR</Title1>
              <Title2>Demo</Title2>
            </Logo>
          </ShakeAnimation>
          {session ? renderSessionButtons() : renderNoSessionButtons()}
          <ThemeToggleButton />
        </BrandContainer>
        <NavItem>
          <NavLink href='#' onClick={() => toggleLanguage()} $isActive={language === 'EN'}>
            EN
          </NavLink>
          {' | '}
          <NavLink href='#' onClick={() => toggleLanguage()} $isActive={language === 'DE'}>
            DE
          </NavLink>
        </NavItem>
        <NavContainer>
          <NavList>{renderNavLinks()}</NavList>

          <BurgerMenuButton
            onClick={() => setIsBurgerOpen((prev) => !prev)}
            aria-label={getText('navigation', 'aria_label_toggle_menu', language)}>
            <BurgerMenuButtonSvg $isOpen={isBurgerOpen} viewBox='0 0 24 24'>
              <line x1='3' y1='6' x2='21' y2='6' />
              <line x1='3' y1='12' x2='21' y2='12' />
              <line x1='3' y1='18' x2='21' y2='18' />
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
