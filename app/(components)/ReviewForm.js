'use client';

import { useState, useEffect } from 'react';

export default function ReviewForm({ review, onSave, onCancel }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [rating, setRating] = useState(1);

  useEffect(() => {
    if (review) {
      setUsername(review.username || '');
      setEmail(review.email || '');
      setNote(review.note || '');
      setRating(review.rating || 1);
    }
  }, [review]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { username, email, note, rating };
    try {
      if (review?._id) {
        // Edit existing review
        await fetch(`/api/reviews/${review._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      } else {
        // Create new review
        await fetch('/api/reviews', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      }
      onSave();
    } catch (error) {
      console.error('Error saving review:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='bg-white shadow-md rounded-lg p-6'>
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
          rows='4'
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className='mt-1 block w-full border-gray-300 rounded-md shadow-sm'
          required
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='rating' className='block text-sm font-medium text-gray-700'>
          Rating
        </label>
        <select
          id='rating'
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          className='mt-1 block w-full border-gray-300 rounded-md shadow-sm'
          required>
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
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
