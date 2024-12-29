// /app/components/Review/ReviewForm.js

'use client';

import { useState, useEffect, useRef, useContext } from 'react';
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
  CharCounter,
} from '@/app/components/Review/ReviewStyles';
import LanguageContext from '@/app/components/Provider/LanguageProvider';
import { getText } from '@/lib/languageLibrary';

export default function ReviewForm({ review, onSave, onCancel, isDemoReview }) {
  const { data: session } = useSession();
  const { language } = useContext(LanguageContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [rating, setRating] = useState(1);
  const maxChars = 400;

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

  const handleNoteChange = (event) => {
    if (event.target.value.length <= maxChars) {
      setNote(event.target.value);
    }
  };

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
      console.error(getText('review_form', 'error_saving_review', language), error);
    }
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <InputGroup>
        <LabelContainer>
          <Label htmlFor='email'>{getText('review_form', 'label_email', language)}</Label>
        </LabelContainer>
        <InputEmail id='email' type='email' value={email} readOnly />
      </InputGroup>
      <InputGroup>
        <LabelContainer>
          <Label htmlFor='note'>{getText('review_form', 'label_note', language)}</Label>
        </LabelContainer>
        <Textarea
          id='note'
          rows='8'
          value={note}
          onChange={handleNoteChange}
          maxLength={maxChars}
          required
          ref={noteRef}
        />
        <CharCounter>
          {note.length}/{maxChars} {getText('review_form', 'label_chars', language)}
        </CharCounter>
      </InputGroup>
      <InputGroup>
        <LabelContainer>
          <Label htmlFor='rating'>{getText('review_form', 'label_rating', language)}</Label>
          <RatingContainer>
            <AccessibleStarRating rating={rating} setRating={setRating} />
          </RatingContainer>
        </LabelContainer>
        <HiddenInput type='hidden' id='rating' value={rating} />
      </InputGroup>
      <CardElementsWrapper>
        {review?.createdAt && (
          <CreatedUpdated>
            {getText('review_form', 'label_created', language)}:{' '}
            {format(new Date(review.createdAt), 'dd.MM.yyyy (HH:mm:ss)')}
            <br />
            {getText('review_form', 'label_updated', language)}:{' '}
            {review.updatedAt
              ? format(new Date(review.updatedAt), 'dd.MM.yyyy (HH:mm:ss)')
              : getText('review_form', 'not_updated', language)}
          </CreatedUpdated>
        )}

        <ButtonContainerHorizontal>
          <Button
            type='submit'
            bgColor='var(--color-button-confirmation)'
            hoverColor='var(--color-button-confirmation-hover)'>
            {getText('review_form', 'button_save', language)}
          </Button>
          <Button
            type='button'
            onClick={onCancel}
            bgColor='var(--color-button-secondary)'
            hoverColor='var(--color-button-secondary-hover)'>
            {getText('review_form', 'button_cancel', language)}
          </Button>
        </ButtonContainerHorizontal>
      </CardElementsWrapper>
    </FormContainer>
  );
}
