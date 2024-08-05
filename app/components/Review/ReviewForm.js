// /app/components/Review/ReviewForm.js

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import styled from 'styled-components';
import Button from '../Common/Button';
import { maskEmail } from '@/utils/maskEmail';

const FormContainer = styled.form`
  background-color: #f5f5f5;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 0.375rem;
  padding: 1rem;
  max-width: 32rem;
  margin: 2rem auto;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a5568;
`;

const Input = styled.input`
  margin-top: 0.25rem;
  width: 100%;
  border-color: #e2e8f0;
  border-radius: 0.375rem;
  padding: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  background-color: ${({ readOnly }) => (readOnly ? '#f0f0f0' : 'white')};
  color: ${({ readOnly }) => (readOnly ? '#6b7280' : 'black')};
  cursor: ${({ readOnly }) => (readOnly ? 'not-allowed' : 'text')};
`;

const Textarea = styled.textarea`
  margin-top: 0.25rem;
  width: 100%;
  border-color: #e2e8f0;
  border-radius: 0.375rem;
  padding: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const RatingContainer = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-top: 0.5rem;
`;

const HiddenInput = styled.input`
  display: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const renderStars = (rating, setRating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const isFilled = rating >= i;
    const isHalf = rating > i - 1 && rating < i;
    stars.push(
      <div
        key={i}
        style={{ cursor: 'pointer', color: isFilled ? '#fbbf24' : '#e5e7eb' }}
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
      setUsername(session.user.name);
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
    const data = { username, email, note, rating };

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
        <Label htmlFor='username'>Username</Label>
        <Input id='username' type='text' value={username} readOnly />
      </FormGroup>
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
        <Button type='submit' bgColor='var(--color-button-save)' hoverColor='var(--color-button-save-hover)'>
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
