// /app/reviews/register/page.js

'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import RegisterForm from '@/app/components/Register/RegisterForm';
import ScrollToTop from '@/app/components/Common/ScrollToTop';

const Main = styled.main`
  padding: 1rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
`;

export default function RegisterPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/reviews');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ScrollToTop />
      <Main>
        <Title>Register</Title>
        <RegisterForm />
      </Main>
    </>
  );
}
