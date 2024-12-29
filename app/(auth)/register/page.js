// /app/reviews/register/page.js

'use client';

import { useContext, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Container, Title } from '@/app/components/Common/CommonStyles';
import RegisterForm from '@/app/components/AuthForm/RegisterForm';
import LoadingAnimation from '@/app/components/Common/LoadingAnimation';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import LanguageContext from '@/app/components/Provider/LanguageProvider';
import { getText } from '@/lib/languageLibrary';

export default function RegisterPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { language } = useContext(LanguageContext);

  const getLanguageText = (key) => {
    return getText('auth_register', key, language);
  };

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
        <Title>{getLanguageText('title')}</Title>
        <RegisterForm />
      </Container>
    </>
  );
}
