// /app/reviews/create/page.js

'use client';

import styled from 'styled-components';
import ProtectedRoute from '@/app/components/Authentication/ProtectedRoute';
import ReviewForm from '@/app/components/Review/ReviewForm';
import { useRouter } from 'next/navigation';
import SessionStatus from '@/app/components/Authentication/SessionStatus';
import ScrollToTop from '@/app/components/Common/ScrollToTop';

const Main = styled.main`
  padding: 1rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
`;

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
        <Title>Create Review</Title>
        <SessionStatus />
        <ReviewForm onSave={handleSave} onCancel={handleCancel} />
      </Main>
    </ProtectedRoute>
  );
}
