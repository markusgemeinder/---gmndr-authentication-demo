// /app/reviews/create/page.js

'use client';

import { useContext } from 'react';
import ProtectedRoute from '@/app/components/Authentication/ProtectedRoute';
import ReviewForm from '@/app/components/Review/ReviewForm';
import { useRouter } from 'next/navigation';
import SessionStatus from '@/app/components/Authentication/SessionStatus';
import { Container, Title } from '@/app/components/Common/CommonStyles';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import LanguageContext from '@/app/components/LanguageProvider';
import { getText } from '@/lib/languageLibrary';

export default function CreatePage() {
  const router = useRouter();
  const { language } = useContext(LanguageContext);

  const getLanguageText = (key) => {
    return getText('review_create', key, language);
  };

  function handleSave() {
    router.push('/reviews');
  }

  function handleCancel() {
    router.push('/reviews');
  }

  return (
    <ProtectedRoute>
      <Container>
        <ScrollToTop />
        <Title>{getLanguageText('title')}</Title>
        <SessionStatus />
        <ReviewForm onSave={handleSave} onCancel={handleCancel} />
      </Container>
    </ProtectedRoute>
  );
}
