// /app/components/Layout/Navigation.js

'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useContext } from 'react';

import Logo from '@/app/components/Layout/Logo';
import ThemeToggleButton from '@/app/components/Button/ThemeToggleButton';
import LanguageContext from '@/app/components/LanguageProvider';
import { getText } from '@/lib/languageLibrary';
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
      <NavItem>
        <NavLink href='/' $isActive={pathname === '/'} onClick={handleLinkClick}>
          {getLanguageText('home')}
        </NavLink>
      </NavItem>
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

      <BurgerMenuItem>
        <NavLink href='/info' $isActive={pathname === '/info'} onClick={handleLinkClick}>
          {getLanguageText('info')}
        </NavLink>
      </BurgerMenuItem>
    </>
  );

  return (
    <>
      <Header>
        <BrandContainer>
          <ShakeAnimation $isShaking={isShaking}>
            <Logo onClick={handleLogoClick} />
          </ShakeAnimation>
        </BrandContainer>
        <NavContainer>
          <NavItem>
            <NavLink href='#' onClick={() => setLanguagePreference('EN')} $isActive={language === 'EN'}>
              EN
            </NavLink>
            {' | '}
            <NavLink href='#' onClick={() => setLanguagePreference('DE')} $isActive={language === 'DE'}>
              DE
            </NavLink>
          </NavItem>
          <ThemeToggleButton />
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
