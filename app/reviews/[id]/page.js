// /app/reviews/[id]/page.js

'use client';

import { useEffect, useState, useContext } from 'react';
import ProtectedRoute from '@/app/components/Authentication/ProtectedRoute';
import ReviewForm from '@/app/components/Review/ReviewForm';
import { useRouter } from 'next/navigation';
import SessionStatus from '@/app/components/Authentication/SessionStatus';
import LoadingAnimation from '@/app/components/Common/LoadingAnimation';
import { Container, Title } from '@/app/components/Common/CommonStyles';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import LanguageContext from '@/app/components/LanguageProvider';
import { getText } from '@/lib/languageLibrary';

export default function EditPage({ params }) {
  const [review, setReview] = useState(null);
  const [isDemoReview, setIsDemoReview] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    async function fetchReview() {
      setLoading(true);
      try {
        if (params.id.startsWith('demo-')) {
          const storedReviews = JSON.parse(sessionStorage.getItem('reviews') || '[]');
          const demoReview = storedReviews.find((r) => r._id === params.id);
          if (demoReview) {
            setReview(demoReview);
            setIsDemoReview(true);
          } else {
            throw new Error(getText('review_edit', 'error_demo_review_not_found', language));
          }
        } else {
          const response = await fetch(`/api/reviews/${params.id}`);
          if (response.ok) {
            const data = await response.json();
            setReview(data);
            setIsDemoReview(false);
          } else {
            throw new Error(getText('review_edit', 'error_review_not_found', language));
          }
        }
      } catch (error) {
        console.error(getText('review_edit', 'error_fetching_review', language), error);
        setReview(null);
        setIsDemoReview(false);
      } finally {
        setLoading(false);
      }
    }

    fetchReview();
  }, [params.id, language]);

  function handleSave() {
    router.push('/reviews');
  }

  function handleCancel() {
    router.push('/reviews');
  }

  if (loading) {
    return <LoadingAnimation />;
  }

  if (!review && !isDemoReview) {
    return <div>{getText('review_edit', 'review_not_found', language)}</div>;
  }

  return (
    <ProtectedRoute>
      <Container>
        <ScrollToTop />
        <Title>{getText('review_edit', 'title', language)}</Title>
        <SessionStatus />
        <ReviewForm review={review} onSave={handleSave} onCancel={handleCancel} isDemoReview={isDemoReview} />
      </Container>
    </ProtectedRoute>
  );
}
