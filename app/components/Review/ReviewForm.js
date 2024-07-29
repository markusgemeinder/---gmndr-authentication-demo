'use client';

import { useState, useEffect } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

// Helper function to render stars
const renderStars = (rating, setRating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const isFilled = rating >= i;
    const isHalf = rating > i - 1 && rating < i;
    stars.push(
      <div
        key={i}
        className={`cursor-pointer ${isFilled ? 'text-yellow-500' : 'text-gray-400'}`}
        onClick={() => setRating(i)}
        onMouseEnter={() => setRating(i)}
        onMouseLeave={() => setRating(rating)}>
        {isFilled ? <FaStar /> : isHalf ? <FaStarHalfAlt /> : <FaRegStar />}
      </div>
    );
  }
  return stars;
};

export default function ReviewForm({ review, onSave, onCancel }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [rating, setRating] = useState(1);

  useEffect(() => {
    if (review) {
      if (review._id.startsWith('demo-')) {
        // Load from session storage
        const storedReviews = JSON.parse(sessionStorage.getItem('reviews') || '[]');
        const demoReview = storedReviews.find((r) => r._id === review._id);
        if (demoReview) {
          setUsername(demoReview.username || '');
          setEmail(demoReview.email || '');
          setNote(demoReview.note || '');
          setRating(demoReview.rating || 1);
        }
      } else {
        // Load from MongoDB
        setUsername(review.username || '');
        setEmail(review.email || '');
        setNote(review.note || '');
        setRating(review.rating || 1);
      }
    }
  }, [review]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { username, email, note, rating };

    try {
      if (review?._id) {
        if (review._id.startsWith('demo-')) {
          // Save to session storage
          const storedReviews = JSON.parse(sessionStorage.getItem('reviews') || '[]');
          const index = storedReviews.findIndex((r) => r._id === review._id);
          if (index !== -1) {
            storedReviews[index] = { ...storedReviews[index], ...data, updatedAt: new Date().toISOString() };
            sessionStorage.setItem('reviews', JSON.stringify(storedReviews));
          }
        } else {
          // Edit existing review in MongoDB
          await fetch(`/api/reviews/${review._id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
        }
      } else {
        if (data.username && data.note) {
          // Create new review
          await fetch('/api/reviews', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
        }
      }
      onSave();
    } catch (error) {
      console.error('Error saving review:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='bg-gray-50 shadow-md rounded-lg p-4 max-w-lg mx-auto mt-8'>
      <div className='mb-4'>
        <label htmlFor='username' className='block text-sm font-medium text-gray-700'>
          Username
        </label>
        <input
          id='username'
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='mt-1 block w-full border-gray-300 rounded-md shadow-sm'
          required
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
          Email
        </label>
        <input
          id='email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='mt-1 block w-full border-gray-300 rounded-md shadow-sm'
          required
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='note' className='block text-sm font-medium text-gray-700'>
          Note
        </label>
        <textarea
          id='note'
          rows='8'
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className='mt-1 block w-full border-gray-300 rounded-md shadow-sm'
          required
        />
      </div>
      <div className='mb-8'>
        <label htmlFor='rating' className='block text-sm font-medium text-gray-700'>
          Rating
        </label>
        <div className='flex space-x-1 mt-2'>{renderStars(rating, setRating)}</div>
        <input type='hidden' id='rating' value={rating} onChange={(e) => setRating(parseInt(e.target.value))} />
      </div>
      <div className='flex gap-4'>
        <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>
          Save
        </button>
        <button type='button' onClick={onCancel} className='bg-gray-500 text-white px-4 py-2 rounded'>
          Cancel
        </button>
      </div>
    </form>
  );
}
