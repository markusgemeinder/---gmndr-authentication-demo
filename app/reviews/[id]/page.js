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

  const getLanguageText = (key) => {
    return getText('review_edit', key, language);
  };

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
            throw new Error(getLanguageText('error_demo_review_not_found'));
          }
        } else {
          const response = await fetch(`/api/reviews/${params.id}`);
          if (response.ok) {
            const data = await response.json();
            setReview(data);
            setIsDemoReview(false);
          } else {
            throw new Error(getLanguageText('error_review_not_found'));
          }
        }
      } catch (error) {
        console.error(getLanguageText('error_fetching_review'), error);
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
    return <div>{getLanguageText('review_not_found')}</div>;
  }

  return (
    <ProtectedRoute>
      <Container>
        <ScrollToTop />
        <Title>{getLanguageText('title')}</Title>
        <SessionStatus />
        <ReviewForm review={review} onSave={handleSave} onCancel={handleCancel} isDemoReview={isDemoReview} />
      </Container>
    </ProtectedRoute>
  );
}
