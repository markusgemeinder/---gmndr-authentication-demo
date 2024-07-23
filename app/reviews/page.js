'use client'; // Markiert diese Datei als Client-Komponente

import { useEffect, useState } from 'react';
import ReviewCard from '../(components)/ReviewCard'; // Stellen Sie sicher, dass der Pfad korrekt ist

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
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </div>
    </main>
  );
}
