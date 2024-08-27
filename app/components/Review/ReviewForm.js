// /app/components/Review/ReviewForm.js

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import Button, { ButtonContainer } from '@/app/components/Common/Button';
import { maskEmail } from '@/utils/maskEmail';
import {
  FormContainer,
  FormGroup,
  Label,
  Input,
  Textarea,
  RatingContainer,
  HiddenInput,
} from '@/app/components/Review/ReviewStyles';

const renderStars = (rating, setRating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const isFilled = rating >= i;
    const isHalf = rating > i - 1 && rating < i;
    stars.push(
      <div
        key={i}
        style={{ cursor: 'pointer', color: isFilled ? 'var(--star-color)' : 'var(--star-empty-color)' }}
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { email, note, rating };

    try {
      if (review?._id) {
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
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor='email'>Email</Label>
        <Input id='email' type='email' value={email} readOnly />
      </FormGroup>
      <FormGroup>
        <Label htmlFor='note'>Note</Label>
        <Textarea id='note' rows='8' value={note} onChange={(e) => setNote(e.target.value)} required />
      </FormGroup>
      <FormGroup>
        <Label htmlFor='rating'>Rating</Label>
        <RatingContainer>{renderStars(rating, setRating)}</RatingContainer>
        <HiddenInput type='hidden' id='rating' value={rating} onChange={(e) => setRating(parseInt(e.target.value))} />
      </FormGroup>
      <ButtonContainer>
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
      </ButtonContainer>
    </FormContainer>
  );
}
