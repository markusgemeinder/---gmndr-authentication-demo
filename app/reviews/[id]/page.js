'use client';

import ProtectedRoute from '@/app/components/Authentication/ProtectedRoute';
import { useEffect, useState } from 'react';
import ReviewForm from '@/app/components/Review/ReviewForm';
import { useRouter } from 'next/navigation';
import SessionStatus from '@/app/components/Authentication/SessionStatus';
import LoadingAnimation from '@/app/components/Common/LoadingAnimation';

export default function EditPage({ params }) {
  const [review, setReview] = useState(null);
  const [isDemoReview, setIsDemoReview] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchReview = async () => {
      setLoading(true);
      try {
        if (params.id.startsWith('demo-')) {
          const storedReviews = JSON.parse(sessionStorage.getItem('reviews') || '[]');
          const demoReview = storedReviews.find((r) => r._id === params.id);
          if (demoReview) {
            setReview(demoReview);
            setIsDemoReview(true);
          } else {
            throw new Error('Demo review not found');
          }
        } else {
          const response = await fetch(`/api/reviews/${params.id}`);
          if (response.ok) {
            const data = await response.json();
            setReview(data);
            setIsDemoReview(false);
          } else {
            throw new Error('Review not found');
          }
        }
      } catch (error) {
        console.error('Error fetching review:', error);
        setReview(null);
        setIsDemoReview(false);
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, [params.id]);

  const handleSave = () => {
    router.push('/reviews');
  };

  const handleCancel = () => {
    router.push('/reviews');
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  if (!review && !isDemoReview) {
    return <div>Review not found</div>;
  }

  return (
    <ProtectedRoute>
      <main className='p-4'>
        <h1 className='text-2xl font-bold mb-1'>Review bearbeiten</h1>
        <SessionStatus />
        <ReviewForm review={review} onSave={handleSave} onCancel={handleCancel} isDemoReview={isDemoReview} />
      </main>
    </ProtectedRoute>
  );
}
