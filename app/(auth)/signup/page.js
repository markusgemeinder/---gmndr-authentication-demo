// /app/(auth)/signup/page.js

'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import { Main, Title } from '@/app/components/AuthForm/AuthFormStyles';
import SignupForm from '@/app/components/AuthForm/SignupForm';

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
