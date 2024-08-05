// /app/reviews/page.js

'use client';

import ProtectedRoute from '../components/Authentication/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReviewCard from '../components/Review/ReviewCard';
import SessionStatus from '../components/Authentication/SessionStatus';
import LoadingAnimation from '../components/Common/LoadingAnimation';
import Button from '../components/Common/Button';
import ScrollToTop from '../components/Common/ScrollToTop';

const Main = styled.main`
  padding: 1rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
`;

const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

const ReviewWrapper = styled.div`
  width: 100%;
  max-width: 40rem;
  margin: 0 auto;
`;

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
      note: 'You signed in as Demo User. This demo review can be edited and deleted, but will not be stored and gets lost when closing the browser. Sie haben sich als Demo-Nutzer angemeldet. Diese Demo-Bewertung kann bearbeitet und gelöscht werden, wird jedoch nicht gespeichert und geht verloren, wenn der Browser geschlossen wird.',
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
        <Title>Reviews</Title>
        <SessionStatus />
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
