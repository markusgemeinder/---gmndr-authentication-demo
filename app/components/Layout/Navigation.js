// /app/components/Layout/Navigation.js

'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useContext } from 'react';

import Logo from '@/app/components/Layout/Logo';
import ThemeToggleButton from '@/app/components/Button/ThemeToggleButton';
import LanguageContext from '@/app/components/LanguageProvider';
import { getText } from '@/lib/languageLibrary';
import { LoginButton, LogoutButton, RegisterButton } from '@/app/components/Button/AuthButtonSvg';
import { ButtonContainerHorizontal } from '@/app/components/Button/Button';
import {
  Header,
  BrandContainer,
  ShakeAnimation,
  NavContainer,
  NavList,
  NavItem,
  NavLink,
  BurgerMenuButton,
  BurgerMenuButtonSvg,
  BurgerMenuNavigation,
  BurgerMenuList,
  BurgerMenuItem,
  Overlay,
} from '@/app/components/Layout/NavigationStyles';

export default function Navigation() {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const { language, toggleLanguage, setLanguagePreference } = useContext(LanguageContext);

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
            <Logo onClick={handleLogoClick} />
          </ShakeAnimation>
          {session ? renderSessionButtons() : renderNoSessionButtons()}
          <ThemeToggleButton />
        </BrandContainer>
        <NavItem>
          <NavLink href='#' onClick={() => setLanguagePreference('EN')} $isActive={language === 'EN'}>
            EN
          </NavLink>
          {' | '}
          <NavLink href='#' onClick={() => setLanguagePreference('DE')} $isActive={language === 'DE'}>
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
