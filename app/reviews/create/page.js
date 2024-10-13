// /app/reviews/create/page.js

'use client';

import ProtectedRoute from '@/app/components/Authentication/ProtectedRoute';
import ReviewForm from '@/app/components/Review/ReviewForm';
import { useRouter } from 'next/navigation';
import SessionStatus from '@/app/components/Authentication/SessionStatus';
import { Main, Title } from '@/app/components/Common/CommonStyles';
import ScrollToTop from '@/app/components/Common/ScrollToTop';

export default function CreatePage() {
  const router = useRouter();

  function handleSave() {
    router.push('/reviews');
  }

  function handleCancel() {
    router.push('/reviews');
  }

  return (
    <ProtectedRoute>
      <ScrollToTop />
      <Main>
        <Title>Create Review</Title>
        <SessionStatus />
        <ReviewForm onSave={handleSave} onCancel={handleCancel} />
      </Main>
    </ProtectedRoute>
  );
}
