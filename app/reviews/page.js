'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReviewCard from '../components/ReviewCard';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const router = useRouter();

  const fetchReviews = async () => {
    setLoading(true); // Set loading to true when starting to fetch
    const response = await fetch('/api/reviews');
    const data = await response.json();
    const sortedReviews = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setReviews(sortedReviews);
    setLoading(false); // Set loading to false when fetch is complete
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async () => {
    await fetchReviews(); // Re-fetch reviews to update the list
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

    // Save to session storage
    const storedReviews = JSON.parse(sessionStorage.getItem('reviews') || '[]');
    storedReviews.unshift(demoReview); // Add demo review to the beginning of the array
    sessionStorage.setItem('reviews', JSON.stringify(storedReviews));

    setReviews([demoReview, ...reviews]); // Update local state
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-2xl font-bold blinking-text'>Loading...</p>
      </div>
    );
  }

  return (
    <main className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Reviews</h1>
      <button
        onClick={() => router.push('/reviews/create')}
        className='bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 mb-4'>
        Create Review
      </button>
      <button
        onClick={handleCreateDemoReview}
        className='bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600 mb-4'>
        Create Review (Demo)
      </button>
      <div className='flex flex-col gap-4'>
        {reviews.map((review) => (
          <div key={review._id} className='w-full max-w-lg mx-auto'>
            <ReviewCard review={review} onDelete={handleDelete} />
          </div>
        ))}
      </div>
    </main>
  );
}
