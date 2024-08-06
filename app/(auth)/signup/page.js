// /app/(auth)/signup/page.js

'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import SignupForm from '@/app/components/Signup/SignupForm';
import ScrollToTop from '@/app/components/Common/ScrollToTop';

const Main = styled.main`
  padding: 1rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
`;

export default function SignupPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/reviews'); // Umleitung zu Reviews-Seite, wenn der Benutzer eingeloggt ist
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>; // Optional: Ladeanzeige
  }

  return (
    <>
      <ScrollToTop />
      <Main>
        <Title>Signup</Title>
        <SignupForm />
      </Main>
    </>
  );
}
