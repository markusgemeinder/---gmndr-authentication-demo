'use client';

import ProtectedRoute from '@/app/components/Authentication/ProtectedRoute';
import { useEffect, useState } from 'react';
import ReviewForm from '@/app/components/ReviewForm';
import { useRouter } from 'next/navigation';
import SessionStatus from '@/app/components/Authentication/SessionStatus';
import LoadingAnimation from '@/app/components/LoadingAnimation';

export default function EditPage({ params }) {
  const [review, setReview] = useState(null);
  const [isDemoReview, setIsDemoReview] = useState(false); // Track if it's a demo review
  const router = useRouter();

  useEffect(() => {
    const fetchReview = async () => {
      // Check if it's a demo review
      if (params.id.startsWith('demo-')) {
        // Load demo review from session storage
        const storedReviews = JSON.parse(sessionStorage.getItem('reviews') || '[]');
        const demoReview = storedReviews.find((r) => r._id === params.id);
        if (demoReview) {
          setReview(demoReview);
          setIsDemoReview(true);
        }
      } else {
        // Load review from MongoDB
        const response = await fetch(`/api/reviews/${params.id}`);
        const data = await response.json();
        setReview(data);
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

  if (!review && !isDemoReview) {
    return <LoadingAnimation />;
  }

  return (
    <ProtectedRoute>
      <main className='p-4'>
        <h1 className='text-2xl font-bold mb-1'>Review bearbeiten</h1>
        <SessionStatus />
        <ReviewForm review={review} onSave={handleSave} onCancel={handleCancel} />
      </main>
    </ProtectedRoute>
  );
}
