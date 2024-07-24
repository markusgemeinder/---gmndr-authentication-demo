'use client';

import { useEffect, useState } from 'react';
import ReviewForm from '@/app/components/ReviewForm';
import { useRouter } from 'next/navigation';

export default function EditPage({ params }) {
  const [review, setReview] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchReview = async () => {
      const response = await fetch(`/api/reviews/${params.id}`);
      const data = await response.json();
      setReview(data);
    };
    fetchReview();
  }, [params.id]);

  const handleSave = () => {
    router.push('/reviews');
  };

  const handleCancel = () => {
    router.push('/reviews');
  };

  if (!review) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-2xl font-bold blinking-text'>Loading...</p>
      </div>
    );
  }

  return (
    <main className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Edit Review</h1>
      <ReviewForm review={review} onSave={handleSave} onCancel={handleCancel} />
    </main>
  );
}
