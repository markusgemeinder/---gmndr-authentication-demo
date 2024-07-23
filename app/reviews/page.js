'use client';

import { useEffect, useState } from 'react';
import ReviewCard from '../(components)/ReviewCard';
import { useRouter } from 'next/navigation'; // Import for navigation

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const router = useRouter(); // Initialize router for navigation

  // Fetch reviews and sort them by the most recent date
  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch('/api/reviews');
      const data = await response.json();

      // Sort reviews by updatedAt date in descending order
      const sortedReviews = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setReviews(sortedReviews);
    };
    fetchReviews();
  }, []);

  return (
    <main className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Reviews</h1>
      {/* Create Review Button */}
      <button
        onClick={() => router.push('/reviews/create')} // Navigate to the create page
        className='bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 mb-4'>
        Create Review
      </button>
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
