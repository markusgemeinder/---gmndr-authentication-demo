'use client'; // Markiert diese Datei als Client-Komponente

import { useEffect, useState } from 'react';
import ReviewCard from '../(components)/ReviewCard';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch('/api/reviews');
      const data = await response.json();
      setReviews(data);
    };
    fetchReviews();
  }, []);

  return (
    <main className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Reviews</h1>
      <div className='flex flex-col gap-4'>
        {reviews.map((review) => (
          <div key={review._id} className='w-full max-w-lg mx-auto'>
            <ReviewCard review={review} />
          </div>
        ))}
      </div>
    </main>
  );
}
