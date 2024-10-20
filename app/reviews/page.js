// /app/reviews/page.js

'use client';

import ProtectedRoute from '@/app/components/Authentication/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReviewCard from '@/app/components/Review/ReviewCard';
import SessionStatus from '@/app/components/Authentication/SessionStatus';
import LoadingAnimation from '@/app/components/Common/LoadingAnimation';
import Button from '@/app/components/Common/Button';
import { Title } from '@/app/components/Common/CommonStyles';
import { ReviewsContainer } from '@/app/components/Review/ReviewStyles';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import { useSession } from 'next-auth/react';

export default function ReviewsPage() {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  async function fetchReviews() {
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
  }

  useEffect(() => {
    fetchReviews();
  }, []);

  async function handleDelete() {
    await fetchReviews();
  }

  function handleCreateDemoReview() {
    const demoReview = {
      _id: `demo-${Math.random().toString(36).substr(2, 12)}`,
      username: 'Demo User',
      email: 'no-reply-demo-user@example.com',
      note: 'Logged in as a Demo User. You can edit and delete this review, but it will not be saved. When logging out or closing the browser it disappears.',
      rating: 5,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const storedReviews = JSON.parse(sessionStorage.getItem('reviews') || '[]');
    storedReviews.unshift(demoReview);
    sessionStorage.setItem('reviews', JSON.stringify(storedReviews));

    setReviews([demoReview, ...reviews]);
  }

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <ProtectedRoute>
      <ScrollToTop />
      <Title>Reviews</Title>
      <SessionStatus />
      {session ? (
        session.user.isDemoUser ? (
          <Button
            onClick={handleCreateDemoReview}
            bgColor='var(--color-button-demo-review)'
            hoverColor='var(--color-button-demo-review-hover)'
            color='var(--color-button-text)'>
            Create Demo Review
          </Button>
        ) : (
          <Button
            onClick={() => router.push('/reviews/create')}
            bgColor='var(--color-button-review)'
            hoverColor='var(--color-button-review-hover)'
            color='var(--color-button-text)'>
            Create Review
          </Button>
        )
      ) : null}
      <ReviewsContainer>
        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review} onDelete={handleDelete} />
        ))}
      </ReviewsContainer>
    </ProtectedRoute>
  );
}
