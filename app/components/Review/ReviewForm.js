// /app/components/Review/ReviewForm.js

'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { format } from 'date-fns';
import Button, { ButtonContainerHorizontal } from '@/app/components/Button/Button';
import AccessibleStarRating from '@/app/components/Common/StarRating';
import {
  FormContainer,
  InputGroup,
  Label,
  LabelContainer,
  InputEmail,
  Textarea,
  HiddenInput,
  CreatedUpdated,
  RatingContainer,
  CardElementsWrapper,
} from '@/app/components/Review/ReviewStyles';

export default function ReviewForm({ review, onSave, onCancel, isDemoReview }) {
  const { data: session } = useSession();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [rating, setRating] = useState(1);

  const noteRef = useRef(null);

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

    noteRef.current?.focus();
  }, [review, session]);

  async function handleSubmit(event) {
    event.preventDefault();
    const data = { email, note, rating };

    try {
      if (isDemoReview) {
        const storedReviews = JSON.parse(sessionStorage.getItem('reviews') || '[]');
        const updatedReviews = storedReviews.map((r) =>
          r._id === review._id
            ? {
                ...r,
                note,
                rating,
                updatedAt: new Date().toISOString(),
              }
            : r
        );
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
      <InputGroup>
        <LabelContainer>
          <Label htmlFor='email'>Email</Label>
        </LabelContainer>
        <InputEmail id='email' type='email' value={email} readOnly />
      </InputGroup>
      <InputGroup>
        <LabelContainer>
          <Label htmlFor='note'>Note</Label>
        </LabelContainer>
        <Textarea
          id='note'
          rows='8'
          value={note}
          onChange={(event) => setNote(event.target.value)}
          required
          ref={noteRef}
        />
      </InputGroup>
      <InputGroup>
        <LabelContainer>
          <Label htmlFor='rating'>Rating</Label>
          <RatingContainer>
            <AccessibleStarRating rating={rating} setRating={setRating} />
          </RatingContainer>
        </LabelContainer>
        <HiddenInput type='hidden' id='rating' value={rating} />
      </InputGroup>
      <CardElementsWrapper>
        {review?.createdAt && (
          <CreatedUpdated>
            Created: {format(new Date(review.createdAt), 'dd.MM.yyyy (HH:mm:ss)')}
            <br />
            Updated: {review.updatedAt ? format(new Date(review.updatedAt), 'dd.MM.yyyy (HH:mm:ss)') : 'Not updated'}
          </CreatedUpdated>
        )}

        <ButtonContainerHorizontal>
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
        </ButtonContainerHorizontal>
      </CardElementsWrapper>
    </FormContainer>
  );
}
