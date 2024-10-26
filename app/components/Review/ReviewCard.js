// /app/components/Review/ReviewCard.js

'use client';

import { format } from 'date-fns';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Button, { ButtonContainerHorizontal } from '@/app/components/Common/Button';
import StarRating from '@/app/components/Common/StarRating';
import {
  CardContainer,
  IDLabel,
  Email,
  Note,
  CreatedUpdated,
  CardElementsWrapper,
} from '@/app/components/Review/ReviewStyles';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalInput,
  ModalParagraph,
} from '@/app/components/Common/ModalPopup';
import { maskEmail } from '@/utils/maskEmail';

export default function ReviewCard({ review, onDelete }) {
  const { _id, note, rating, createdAt, updatedAt, email } = review;
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();
  const { data: session } = useSession();

  const isOwner = session && session.user.email === email;
  const isAdmin = session && session.user.role.includes('Admin');

  const showEmail = isOwner || isAdmin ? email : maskEmail(email);
  const showButtons = isOwner || isAdmin || _id.startsWith('demo-');

  async function handleDelete() {
    if (inputValue === _id.slice(-4)) {
      try {
        if (_id.startsWith('demo-')) {
          const storedReviews = JSON.parse(sessionStorage.getItem('reviews') || '[]');
          const updatedReviews = storedReviews.filter((r) => r._id !== _id);
          sessionStorage.setItem('reviews', JSON.stringify(updatedReviews));
          if (onDelete) onDelete();
        } else {
          await fetch(`/api/reviews/${_id}`, { method: 'DELETE' });
          if (onDelete) onDelete();
        }
      } catch (error) {
        console.error('Error deleting the review:', error);
      }
    } else {
      alert('The last 4 digits do not match. Please try again.');
    }
  }

  return (
    <>
      <CardContainer>
        <IDLabel>ID: {_id}</IDLabel>
        <CardElementsWrapper>
          <Email>{showEmail}</Email>
          <Note>{note}</Note>
          <StarRating rating={rating} />
          <CreatedUpdated>
            Created: {format(new Date(createdAt), 'dd.MM.yyyy (HH:mm:ss)')}
            <br />
            Updated: {format(new Date(updatedAt), 'dd.MM.yyyy (HH:mm:ss)')}
          </CreatedUpdated>
          {showButtons && (
            <ButtonContainerHorizontal>
              <Button
                onClick={() => router.push(`/reviews/${_id}`)}
                bgColor='var(--color-button-edit)'
                hoverColor='var(--color-button-edit-hover)'
                color='var(--color-button-text)'>
                Edit
              </Button>
              <Button
                onClick={() => setConfirmDelete(true)}
                bgColor='var(--color-button-delete)'
                hoverColor='var(--color-button-delete-hover)'
                color='var(--color-button-text)'>
                Delete
              </Button>
            </ButtonContainerHorizontal>
          )}
        </CardElementsWrapper>
      </CardContainer>

      {confirmDelete && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Confirm Delete – ID: {_id}</ModalHeader>
            <ModalParagraph>Are you sure you want to delete this review? This action is irreversible.</ModalParagraph>
            <ModalInput
              type='text'
              placeholder='Enter last 4 digits of the review ID'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <ButtonContainerHorizontal>
              <Button
                onClick={handleDelete}
                bgColor='var(--color-button-delete)'
                hoverColor='var(--color-button-delete-hover)'>
                Confirm
              </Button>
              <Button
                onClick={() => setConfirmDelete(false)}
                bgColor='var(--color-button-cancel)'
                hoverColor='var(--color-button-cancel-hover)'>
                Cancel
              </Button>
            </ButtonContainerHorizontal>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}
