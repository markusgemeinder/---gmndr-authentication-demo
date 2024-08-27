// app/components/Common/Navigation.js

'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import LoadingAnimation from './LoadingAnimation';
import styled from 'styled-components';
import Button from './Button';

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

const NavLink = styled.a`
  color: var(--color-header-text);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default function Navigation() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname(); // Aktuelle Pathname holen

  useEffect(() => {
    if (status === 'unauthenticated' && pathname === '/register') {
      // Falls nicht authentifiziert und auf der Register-Seite
      return;
    }
    if (status === 'unauthenticated' && pathname !== '/register') {
      // Falls nicht authentifiziert und nicht auf der Register-Seite
      router.push('/');
    } else if (status === 'authenticated' && pathname === '/') {
      // Falls authentifiziert und auf der Startseite
      router.push('/reviews');
    }
  }, [status, router, pathname]);

  if (status === 'loading') {
    return <LoadingAnimation />;
  }

  return (
    <Header>
      <BrandContainer>
        <Title>MyApp</Title>
        <div>
          {session ? (
            <Button
              bgColor='var(--color-button-logout)'
              hoverColor='var(--color-button-logout-hover)'
              onClick={() => signOut()}>
              Logout
            </Button>
          ) : (
            <>
              <Button
                bgColor='var(--color-button-login)'
                hoverColor='var(--color-button-login-hover)'
                onClick={() =>
                  signIn({ redirect: false }) // Redirect false verhindern
                    .then((result) => {
                      if (result.ok) {
                        router.push('/reviews'); // Redirect to reviews after successful login
                      } else {
                        router.push('/'); // Redirect to homepage on login failure
                      }
                    })
                }>
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
        </div>
      </BrandContainer>
      {session && (
        <NavContainer>
          <NavList>
            <NavItem>
              <NavLink href='/'>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='/reviews'>Reviews</NavLink>
            </NavItem>
            {session.user.role === 'admin' && (
              <NavItem>
                <NavLink href='/api/reviews'>API</NavLink>
              </NavItem>
            )}
          </NavList>
        </NavContainer>
      )}
    </Header>
  );
}
