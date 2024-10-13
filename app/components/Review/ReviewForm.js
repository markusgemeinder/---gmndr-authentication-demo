// /app/components/Review/ReviewForm.js

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import Button from '@/app/components/Common/Button';
import {
  FormContainer,
  FormGroup,
  Label,
  Input,
  Textarea,
  RatingContainer,
  HiddenInput,
  HorizontalButtonContainer,
} from '@/app/components/Review/ReviewStyles';

function renderStars(rating, setRating) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const isFilled = rating >= i;
    const isHalf = rating > i - 1 && rating < i;
    stars.push(
      <div
        key={i}
        style={{
          cursor: 'pointer',
          color: isFilled ? 'var(--star-color)' : 'var(--star-empty-color)',
          display: 'inline-block',
        }}
        onClick={() => setRating(i)}
        onMouseEnter={() => setRating(i)}
        onMouseLeave={() => setRating(rating)}>
        {isFilled ? <FaStar /> : isHalf ? <FaStarHalfAlt /> : <FaRegStar />}
      </div>
    );
  }
  return stars;
}

export default function ReviewForm({ review, onSave, onCancel, isDemoReview }) {
  const { data: session } = useSession();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [rating, setRating] = useState(1);

  useEffect(() => {
    if (session) {
      setUsername(session.user.username);
      setEmail(session.user.email);
    }

    if (review) {
      setEmail(review.email || '');
      setNote(review.note || '');
      setRating(review.rating || 1);
    }
  }, [review, session]);

  async function handleSubmit(event) {
    event.preventDefault();
    const data = { email, note, rating };

    try {
      if (isDemoReview) {
        const storedReviews = JSON.parse(sessionStorage.getItem('reviews') || '[]');
        const updatedReviews = storedReviews.map((r) => (r._id === review._id ? { ...r, note, rating } : r));
        sessionStorage.setItem('reviews', JSON.stringify(updatedReviews));
      } else if (review?._id) {
        await fetch(`/api/reviews/${review._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      } else {
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
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor='email'>Email</Label>
        <Input id='email' type='email' value={email} readOnly />
      </FormGroup>
      <FormGroup>
        <Label htmlFor='note'>Note</Label>
        <Textarea id='note' rows='8' value={note} onChange={(event) => setNote(event.target.value)} required />
      </FormGroup>
      <FormGroup>
        <Label htmlFor='rating'>Rating</Label>
        <RatingContainer>{renderStars(rating, setRating)}</RatingContainer>
        <HiddenInput
          type='hidden'
          id='rating'
          value={rating}
          onChange={(event) => setRating(parseInt(event.target.value))}
        />
      </FormGroup>
      <HorizontalButtonContainer>
        <Button type='submit' bgColor='var(--color-button-ok)' hoverColor='var(--color-button-ok-hover)'>
          Save
        </Button>
        <Button
          type='button'
          onClick={onCancel}
          bgColor='var(--color-button-cancel)'
          hoverColor='var(--color-button-cancel-hover)'>
          Cancel
        </Button>
      </HorizontalButtonContainer>
    </FormContainer>
  );
}
