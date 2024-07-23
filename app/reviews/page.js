// 'use client';

// import { useEffect, useState } from 'react';
// import ReviewCard from '../(components)/ReviewCard';
// import { useRouter } from 'next/navigation';

// export default function ReviewsPage() {
//   const [reviews, setReviews] = useState([]);
//   const router = useRouter();

//   const fetchReviews = async () => {
//     const response = await fetch('/api/reviews');
//     const data = await response.json();
//     const sortedReviews = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//     setReviews(sortedReviews);
//   };

//   useEffect(() => {
//     fetchReviews();
//   }, []);

//   const handleDelete = async () => {
//     await fetchReviews(); // Re-fetch reviews to update the list
//   };

//   return (
//     <main className='p-4'>
//       <h1 className='text-2xl font-bold mb-4'>Reviews</h1>
//       <button
//         onClick={() => router.push('/reviews/create')}
//         className='bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 mb-4'>
//         Create Review
//       </button>
//       <div className='flex flex-col gap-4'>
//         {reviews.map((review) => (
//           <div key={review._id} className='w-full max-w-lg mx-auto'>
//             <ReviewCard review={review} onDelete={handleDelete} />
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import ReviewCard from '../(components)/ReviewCard';
import { useRouter } from 'next/navigation';

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
