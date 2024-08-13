// /app/reviews/page.js

'use client';

import { useEffect, useState } from 'react';
import {
  Main,
  SmallTitle,
  ButtonContainer,
  ReviewsContainer,
  ReviewWrapper,
} from '@/app/components/Common/CommonStyles';
import ProtectedRoute from '@/app/components/Authentication/ProtectedRoute';
import { useRouter } from 'next/navigation';
import ReviewCard from '@/app/components/Review/ReviewCard';
import SessionStatus from '@/app/components/Authentication/SessionStatus';
import LoadingAnimation from '@/app/components/Common/LoadingAnimation';
import Button from '@/app/components/Common/Button';
import ScrollToTop from '@/app/components/Common/ScrollToTop';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/reviews');
      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error('Data is not an array');
      }

      const storedReviews = JSON.parse(sessionStorage.getItem('reviews') || '[]');
      const combinedReviews = [...storedReviews, ...data];
      const sortedReviews = combinedReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setReviews(sortedReviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async () => {
    await fetchReviews();
  };

  const handleCreateDemoReview = () => {
    const demoReview = {
      _id: `demo-${Math.random().toString(36).substr(2, 12)}`,
      username: 'Demo User',
      email: 'test@demo.de',
      note: 'Signed in as Demo User. This review can be edited and deleted, but is not stored and will be lost when the browser is closed.\n\nAngemeldet als Demo-Nutzer. Diese Bewertung kann bearbeitet und gelöscht werden, wird aber nicht gespeichert und geht beim Schließen des Browsers verloren.',
      rating: 5,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const storedReviews = JSON.parse(sessionStorage.getItem('reviews') || '[]');
    storedReviews.unshift(demoReview);
    sessionStorage.setItem('reviews', JSON.stringify(storedReviews));

    setReviews([demoReview, ...reviews]);
  };

  const demoReviewExists = reviews.some((review) => review._id.startsWith('demo-'));

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <ProtectedRoute>
      <ScrollToTop />
      <Main>
        <SmallTitle>Reviews</SmallTitle>
        <SessionStatus />
        <ButtonContainer>
          <Button
            onClick={() => router.push('/reviews/create')}
            bgColor='var(--color-button-review)'
            hoverColor='var(--color-button-review-hover)'
            color='var(--color-button-text)'>
            Create Review
          </Button>
          {!demoReviewExists && (
            <Button
              onClick={handleCreateDemoReview}
              bgColor='var(--color-button-demo-review)'
              hoverColor='var(--color-button-demo-review-hover)'
              color='var(--color-button-text)'>
              Create Demo Review
            </Button>
          )}
        </ButtonContainer>
        <ReviewsContainer>
          {reviews.map((review) => (
            <ReviewWrapper key={review._id}>
              <ReviewCard review={review} onDelete={handleDelete} />
            </ReviewWrapper>
          ))}
        </ReviewsContainer>
      </Main>
    </ProtectedRoute>
  );
}
