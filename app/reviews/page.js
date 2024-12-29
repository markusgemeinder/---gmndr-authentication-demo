// /app/reviews/page.js

'use client';

import { useState, useContext, useEffect } from 'react';
import ProtectedRoute from '@/app/components/Authentication/ProtectedRoute';
import { useRouter } from 'next/navigation';
import ReviewCard from '@/app/components/Review/ReviewCard';
import SessionStatus from '@/app/components/Authentication/SessionStatus';
import LoadingAnimation from '@/app/components/Common/LoadingAnimation';
import Button from '@/app/components/Button/Button';
import { Container, Title } from '@/app/components/Common/CommonStyles';
import { ReviewsContainer } from '@/app/components/Review/ReviewStyles';
import ScrollToTop from '@/app/components/Common/ScrollToTop';
import { useSession } from 'next-auth/react';
import LanguageContext from '@/app/components/Provider/LanguageProvider';
import { getText } from '@/lib/languageLibrary';

export default function ReviewsPage() {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { language } = useContext(LanguageContext);

  const getLanguageText = (key) => {
    return getText('reviews', key, language);
  };

  async function fetchReviews() {
    setLoading(true);
    try {
      const response = await fetch('/api/reviews');
      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error(getLanguageText('error_not_array'));
      }

      const storedReviews = JSON.parse(sessionStorage.getItem('reviews') || '[]');
      const combinedReviews = [...storedReviews, ...data];
      const sortedReviews = combinedReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setReviews(sortedReviews);
    } catch (error) {
      console.error(getLanguageText('error_fetching_reviews'), error);
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
      username: getLanguageText('username_demo'),
      email: 'no-reply-demo-user@example.com',
      note: getLanguageText('demo_review_note'),
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
      <Container>
        <ScrollToTop />
        <Title>{getLanguageText('title')}</Title>
        <SessionStatus />
        {session ? (
          session.user.isDemoUser ? (
            <Button
              onClick={handleCreateDemoReview}
              bgColor='var(--color-button-attention)'
              hoverColor='var(--color-button-attention-hover)'
              color='var(--color-button-text)'>
              {getLanguageText('button_create_demo_review')}
            </Button>
          ) : (
            <Button
              onClick={() => router.push('/reviews/create')}
              bgColor='var(--color-button-attention)'
              hoverColor='var(--color-button-attention-hover)'
              color='var(--color-button-text)'>
              {getLanguageText('button_create_review')}
            </Button>
          )
        ) : null}
        <ReviewsContainer>
          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review} onDelete={handleDelete} />
          ))}
        </ReviewsContainer>
      </Container>
    </ProtectedRoute>
  );
}
