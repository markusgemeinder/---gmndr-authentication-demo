// /app/components/Review/ReviewCard.js

'use client';

import { format } from 'date-fns';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import Button, { ButtonContainer } from '@/app/components/Common/Button';
import {
  CardContainer,
  IDLabel,
  Email,
  Note,
  StarsContainer,
  CreatedUpdated,
} from '@/app/components/Review/ReviewStyles';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalParagraph,
  ModalInput,
  ModalButtonContainer,
} from '@/app/components/Common/ModalPopup';
import { maskEmail } from '@/utils/maskEmail';

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} style={{ color: 'var(--star-color)' }} />);
    } else if (rating > i - 1) {
      stars.push(<FaStarHalfAlt key={i} style={{ color: 'var(--star-color)' }} />);
    } else {
      stars.push(<FaRegStar key={i} style={{ color: 'var(--star-empty-color)' }} />);
    }
  }
  return stars;
};

export default function ReviewCard({ review, onDelete }) {
  const { _id, note, rating, createdAt, updatedAt, email } = review;
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();
  const { data: session } = useSession();

  const isOwner = session && session.user.email === email;
  const isAdmin = session && session.user.role === 'admin';

  const showEmail = isOwner || isAdmin ? email : maskEmail(email);
  const showButtons = isOwner || isAdmin || _id.startsWith('demo-');

  const handleDelete = async () => {
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
        console.error('Error deleting review:', error);
      }
    } else {
      alert('The last 4 digits do not match. Please try again.');
    }
  };

  return (
    <>
      <CardContainer>
        <IDLabel>ID: {_id}</IDLabel>
        <Email>{showEmail}</Email>
        <Note>{note}</Note>
        <StarsContainer>{renderStars(rating)}</StarsContainer>
        <CreatedUpdated>
          Created: {format(new Date(createdAt), 'dd.MM.yyyy (HH:mm:ss)')} | Updated:{' '}
          {format(new Date(updatedAt), 'dd.MM.yyyy (HH:mm:ss)')}
        </CreatedUpdated>
        {showButtons && (
          <ButtonContainer>
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
          </ButtonContainer>
        )}
      </CardContainer>

      {confirmDelete && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Confirm Deletion Object ID {_id}</ModalHeader>
            <ModalParagraph>
              Are you sure you want to delete? Please enter the last 4 digits of the ID to confirm.
            </ModalParagraph>
            <ModalInput
              type='text'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder='Last 4 digits'
              maxLength={4}
            />
            <ModalButtonContainer>
              <Button
                onClick={handleDelete}
                bgColor='var(--color-button-delete)'
                hoverColor='var(--color-button-delete-hover)'
                color='var(--color-button-text)'>
                Confirm
              </Button>
              <Button
                onClick={() => setConfirmDelete(false)}
                bgColor='var(--color-button)'
                hoverColor='var(--color-button-hover)'
                color='var(--color-button-text)'>
                Cancel
              </Button>
            </ModalButtonContainer>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}
