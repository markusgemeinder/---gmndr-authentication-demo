// /app/components/Common/Navigation.js

'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation'; // Verwenden Sie usePathname, um den aktuellen Pfad zu erhalten
import { useContext } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Button, { ButtonContainer } from '@/app/components/Common/Button';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import LoadingAnimation from '@/app/components/Common/LoadingAnimation';
import { ThemeContext } from '@/app/components/Common/ThemeProvider';

const Header = styled.header`
  background-color: var(--color-header);
  color: var(--color-header-text);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
`;

const BrandContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0.4rem 2rem;
`;

const Title = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0.4rem 2rem;
`;

const NavList = styled.ul`
  display: flex;
  gap: 1rem;
`;

const NavItem = styled.li`
  list-style: none;
`;

const NavLink = styled(Link)`
  color: var(--color-header-text);
  text-decoration: none;
  border-bottom: ${({ isActive }) => (isActive ? '2px solid var(--color-header-text)' : 'none')};

  &:hover {
    /* text-decoration: underline; */
    color: var(--color-link-hover);
  }
`;

const ThemeToggle = styled.button`
  margin-left: 2rem;
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

export default function Navigation() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname(); // Der aktuelle Pfad der Seite
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Handle authentication and redirection
  if (status === 'loading') {
    return <LoadingAnimation />;
  }

  return (
    <Header>
      <BrandContainer>
        <Title>MyApp</Title>
        <ButtonContainer>
          {session ? (
            <Button
              bgColor='var(--color-button-logout)'
              hoverColor='var(--color-button-logout-hover)'
              onClick={() => signOut({ callbackUrl: '/' })}>
              Logout
            </Button>
          ) : (
            <>
              <Button
                bgColor='var(--color-button-login)'
                hoverColor='var(--color-button-login-hover)'
                onClick={() => router.push('/login')}>
                Login
              </Button>
              <Button
                bgColor='var(--color-button-register)'
                hoverColor='var(--color-button-register-hover)'
                onClick={() => router.push('/register')}>
                Register
              </Button>
            </>
          )}
        </ButtonContainer>
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
          {/* About Item verschoben */}
          <NavItem>
            <NavLink href='/about' isActive={pathname === '/about'}>
              About
            </NavLink>
          </NavItem>
        </NavList>
        <ThemeToggle onClick={toggleTheme} aria-label='Toggle Theme'>
          {theme === 'light' ? <MoonIcon className='h-6 w-6' /> : <SunIcon className='h-6 w-6' />}
        </ThemeToggle>
      </NavContainer>
    </Header>
  );
}
