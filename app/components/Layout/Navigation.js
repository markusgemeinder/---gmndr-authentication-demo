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

  const getLanguageText = (key) => {
    return getText('navigation', key, language);
  };

  const handleLinkClick = () => {
    if (isBurgerOpen) setIsBurgerOpen(false);
  };

  const handleLogoClick = () => {
    if (pathname === '/') {
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
      }, 300); // Duration of the animation
    } else {
      router.push('/');
    }
  };

  const renderNavLinks = () => (
    <>
      {!session && (
        <NavItem>
          <NavLink href='/forgot-password' $isActive={pathname === '/forgot-password'} onClick={handleLinkClick}>
            {getLanguageText('forgot_password')}
          </NavLink>
        </NavItem>
      )}
      <NavItem>
        <NavLink href='/' $isActive={pathname === '/'} onClick={handleLinkClick}>
          {getLanguageText('home')}
        </NavLink>
      </NavItem>
      {session && (
        <NavItem>
          <NavLink href='/reviews' $isActive={pathname === '/reviews'} onClick={handleLinkClick}>
            {getLanguageText('reviews')}
          </NavLink>
        </NavItem>
      )}
      <NavItem>
        <NavLink href='/info' $isActive={pathname === '/info'} onClick={handleLinkClick}>
          {getLanguageText('info')}
        </NavLink>
      </NavItem>
    </>
  );

  const renderBurgerMenuLinks = () => (
    <>
      <BurgerMenuItem>
        <NavLink href='/' $isActive={pathname === '/'} onClick={handleLinkClick}>
          {getLanguageText('home')}
        </NavLink>
      </BurgerMenuItem>

      {session ? (
        <>
          <BurgerMenuItem>
            <NavLink href='/reviews' $isActive={pathname === '/reviews'} onClick={handleLinkClick}>
              {getLanguageText('reviews')}
            </NavLink>
          </BurgerMenuItem>
          <BurgerMenuItem>
            <NavLink href='/info' $isActive={pathname === '/info'} onClick={handleLinkClick}>
              {getLanguageText('info')}
            </NavLink>
          </BurgerMenuItem>
          <BurgerMenuItem>
            <NavLink href='#' onClick={() => signOut({ callbackUrl: '/' })}>
              {getLanguageText('logout')}
            </NavLink>
          </BurgerMenuItem>
        </>
      ) : (
        <>
          <BurgerMenuItem>
            <NavLink href='/login' $isActive={pathname === '/login'} onClick={handleLinkClick}>
              {getLanguageText('login')}
            </NavLink>
          </BurgerMenuItem>
          <BurgerMenuItem>
            <NavLink href='/register' $isActive={pathname === '/register'} onClick={handleLinkClick}>
              {getLanguageText('register')}
            </NavLink>
          </BurgerMenuItem>
          <BurgerMenuItem>
            <NavLink href='/forgot-password' $isActive={pathname === '/forgot-password'} onClick={handleLinkClick}>
              {getLanguageText('forgot_password')}
            </NavLink>
          </BurgerMenuItem>
          <BurgerMenuItem>
            <NavLink href='/info' $isActive={pathname === '/info'} onClick={handleLinkClick}>
              {getLanguageText('info')}
            </NavLink>
          </BurgerMenuItem>
        </>
      )}
    </>
  );

  const renderSessionButtons = () => {
    const logoutText = getLanguageText('logout');

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
    const loginText = getLanguageText('login');
    const registerText = getLanguageText('register');

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
            aria-label={getLanguageText('aria_label_toggle_menu')}>
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
