// /app/components/Common/Navigation.js

'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useContext, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Button from '@/app/components/Common/Button';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import LoadingAnimation from '@/app/components/Common/LoadingAnimation';
import { ThemeContext } from '@/app/components/Common/ThemeProvider';

// Styled components
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
  padding: 0 1rem;
  height: 4rem;
`;

const BrandContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  margin-right: 1rem;
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
  border-bottom: ${({ isActive }) => (isActive ? '2px solid var(--color-header-text)' : 'none')};

  &:hover {
    color: var(--color-link-hover);
  }
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: var(--color-header-text);
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    color: var(--color-link-hover);
  }
`;

const BurgerMenuButton = styled.button`
  background: none;
  border: none;
  color: var(--color-header-text);
  cursor: pointer;
  font-size: 1.5rem;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const BurgerMenuButtonSvg = styled.svg`
  width: 24px;
  height: 24px;
  stroke: var(--color-header-text);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;

  line {
    transition: stroke 0.3s ease;
  }
`;

const BurgerMenuNavigation = styled.nav`
  position: fixed;
  top: 4rem;
  left: 0;
  width: 60%;
  height: 100vh;
  background-color: var(--color-burger-menu-background);
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
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
  /* border-bottom: 1px solid var(--color-border); */ /* Entfernt die Linie */
`;

export default function Navigation() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  if (status === 'loading') {
    return <LoadingAnimation />;
  }

  return (
    <>
      <Header>
        <BrandContainer>
          <Title>MyApp</Title>
          <Button
            bgColor={session ? 'var(--color-button-logout)' : 'var(--color-button-login)'}
            hoverColor={session ? 'var(--color-button-logout-hover)' : 'var(--color-button-login-hover)'}
            onClick={() => {
              if (session) {
                signOut({ callbackUrl: '/' });
              } else {
                router.push('/login');
              }
            }}>
            {session ? 'Logout' : 'Login'}
          </Button>
          {!session && (
            <Button
              bgColor='var(--color-button-register)'
              hoverColor='var(--color-button-register-hover)'
              onClick={() => router.push('/register')}>
              Register
            </Button>
          )}
        </BrandContainer>
        <NavContainer>
          <NavList>
            <NavItem>
              <NavLink href='/' isActive={pathname === '/'}>
                Home
              </NavLink>
            </NavItem>
            {session && (
              <>
                <NavItem>
                  <NavLink href='/reviews' isActive={pathname === '/reviews'}>
                    Reviews
                  </NavLink>
                </NavItem>
                {session.user.role === 'admin' && (
                  <NavItem>
                    <NavLink href='/api/reviews' isActive={pathname === '/api/reviews'}>
                      API
                    </NavLink>
                  </NavItem>
                )}
              </>
            )}
            <NavItem>
              <NavLink href='/about' isActive={pathname === '/about'}>
                About
              </NavLink>
            </NavItem>
          </NavList>
          <ThemeToggle onClick={toggleTheme} aria-label='Toggle Theme'>
            {theme === 'light' ? <MoonIcon className='h-6 w-6' /> : <SunIcon className='h-6 w-6' />}
          </ThemeToggle>
          <BurgerMenuButton onClick={() => setIsBurgerOpen(!isBurgerOpen)}>
            <BurgerMenuButtonSvg viewBox='0 0 24 24' isOpen={isBurgerOpen}>
              {isBurgerOpen ? (
                <>
                  <line x1='18' y1='6' x2='6' y2='18' />
                  <line x1='6' y1='6' x2='18' y2='18' />
                </>
              ) : (
                <>
                  <line x1='3' y1='12' x2='21' y2='12' />
                  <line x1='3' y1='6' x2='21' y2='6' />
                  <line x1='3' y1='18' x2='21' y2='18' />
                </>
              )}
            </BurgerMenuButtonSvg>
          </BurgerMenuButton>
        </NavContainer>
      </Header>
      <BurgerMenuNavigation isOpen={isBurgerOpen}>
        <BurgerMenuList>
          <BurgerMenuItem>
            <NavLink href='/' isActive={pathname === '/'}>
              Home
            </NavLink>
          </BurgerMenuItem>
          {session && (
            <>
              <BurgerMenuItem>
                <NavLink href='/reviews' isActive={pathname === '/reviews'}>
                  Reviews
                </NavLink>
              </BurgerMenuItem>
              {session.user.role === 'admin' && (
                <BurgerMenuItem>
                  <NavLink href='/api/reviews' isActive={pathname === '/api/reviews'}>
                    API
                  </NavLink>
                </BurgerMenuItem>
              )}
            </>
          )}
          <BurgerMenuItem>
            <NavLink href='/about' isActive={pathname === '/about'}>
              About
            </NavLink>
          </BurgerMenuItem>
        </BurgerMenuList>
      </BurgerMenuNavigation>
    </>
  );
}
