// /app/reviews/register/page.js

'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Title } from '@/app/components/Common/CommonStyles';
import RegisterForm from '@/app/components/AuthForm/RegisterForm';
import LoadingAnimation from '@/app/components/Common/LoadingAnimation';
import ScrollToTop from '@/app/components/Common/ScrollToTop';

export default function RegisterPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/reviews');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <LoadingAnimation />;
  }

  return (
    <>
      <Container>
        <ScrollToTop />
        <Title>Register</Title>
        <RegisterForm />
      </Container>
    </>
  );
}
