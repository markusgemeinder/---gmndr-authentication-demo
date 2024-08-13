// /app/reviews/create/page.js

'use client';

import { Main, SmallTitle } from '@/app/components/Common/CommonStyles';
import ProtectedRoute from '@/app/components/Authentication/ProtectedRoute';
import ReviewForm from '@/app/components/Review/ReviewForm';
import { useRouter } from 'next/navigation';
import SessionStatus from '@/app/components/Authentication/SessionStatus';
import ScrollToTop from '@/app/components/Common/ScrollToTop';

export default function CreatePage() {
  const router = useRouter();

  const handleSave = () => {
    router.push('/reviews');
  };

  const handleCancel = () => {
    router.push('/reviews');
  };

  return (
    <ProtectedRoute>
      <ScrollToTop />
      <Main>
        <SmallTitle>Create Review</SmallTitle>
        <SessionStatus />
        <ReviewForm onSave={handleSave} onCancel={handleCancel} />
      </Main>
    </ProtectedRoute>
  );
}
